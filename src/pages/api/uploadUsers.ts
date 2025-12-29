import type { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/utils/firebase";

type IncomingUser = {
  name?: string;
  email?: string;
  role?: string;
  mobile?: string;
  courseName?: string;
  courseDuration?: string;
  courseStartDate?: string;
  subject?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { users } = req.body as { users?: IncomingUser[] };
  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: "No users provided." });
  }

  const db = getDb();
  const results = { created: 0, skipped: 0 };

  for (const user of users) {
    const email = user.email?.trim().toLowerCase();
    if (!email) {
      results.skipped += 1;
      continue;
    }

    const userRef = doc(db, "users", email);
    const existing = await getDoc(userRef);
    if (existing.exists()) {
      results.skipped += 1;
      continue;
    }

    const payload = {
      name: user.name?.trim() || "User",
      email,
      role: user.role?.trim() || "Member",
      mobile: user.mobile?.trim() || "",
      courseName: user.courseName?.trim() || "",
      courseDuration: user.courseDuration?.trim() || "",
      courseStartDate: user.courseStartDate?.trim() || "",
      subject: user.subject?.trim() || "",
      createdAt: serverTimestamp(),
    };

    await setDoc(userRef, payload);
    results.created += 1;
  }

  return res.status(200).json(results);
}
