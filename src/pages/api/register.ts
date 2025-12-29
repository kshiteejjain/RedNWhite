import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/utils/firebase";

type RegisterRequestBody = {
  role?: "faculty" | "student";
  name?: string;
  email?: string;
  password?: string;
  subject?: string;
  courseName?: string;
  courseDuration?: string;
  courseStartDate?: string;
  mobileNumber?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    role,
    name,
    email,
    password,
    subject = "",
    courseName = "",
    courseDuration = "",
    courseStartDate = "",
    mobileNumber = "",
  } = req.body as RegisterRequestBody;

  if (!email || !password || !name || !role) {
    return res
      .status(400)
      .json({ message: "role, name, email, and password are required." });
  }

  try {
    const db = getDb();
    const userRef = doc(db, "users", email);
    const existingUser = await getDoc(userRef);

    if (existingUser.exists()) {
      return res.status(409).json({ message: "Email already exists." });
    }

    await setDoc(userRef, {
      userId: randomUUID(),
      role,
      name,
      email,
      password,
      subject: role === "faculty" ? subject : "",
      courseName: role === "student" ? courseName : "",
      courseDuration: role === "student" ? courseDuration : "",
      courseStartDate: role === "student" ? courseStartDate : "",
      mobileNumber: role === "student" ? mobileNumber : "",
      createdAt: serverTimestamp(),
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to register user.";
    console.error("Error registering user", error);
    return res.status(500).json({ message });
  }
}
