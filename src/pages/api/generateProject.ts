import type { NextApiRequest, NextApiResponse } from "next";

type RecentProject = {
  name?: string;
  category?: string;
  techStack?: string[];
  description?: string;
};

type GenerateRequest = {
  recentProjects?: RecentProject[];
};

type GenerateResponse = {
  name: string;
  category: string;
  description: string;
  durationDays: number;
  techStack: string[];
  budget: string;
};

const upstreamUrl =
  process.env.GENERATE_CONTENT_API_URL ||
  process.env.NEXT_PUBLIC_GENERATE_CONTENT_API_URL ||
  process.env.REACT_APP_GENERATE_CONTENT_API_URL ||
  "";

const buildPrompt = (recent?: RecentProject[]) => {
  const summary =
    recent && recent.length
      ? recent
          .slice(0, 3)
          .map(
            (p, i) =>
              `${i + 1}. ${p.name || "Untitled"} — ${p.category || "General"}; tech: ${
                p.techStack?.join(", ") || "unspecified"
              }; desc: ${p.description || "n/a"}`
          )
          .join("\n")
      : "No recent practice projects shared.";

  return [
    "You generate concise, student-friendly project briefs.",
    "Use general knowledge; do not repeat the given projects.",
    "Vary the domain—consider banking/fintech, education, pet services/grooming, content creation, logistic, social media apps, ecommerce, CRUD admin apps, image editing tools, video platforms (e.g., YouTube-like), and AI-assisted features. Do NOT stick to healthcare only.",
    "Recent practice projects:",
    summary,
    "Produce exactly ONE new project idea related to the above but not identical.",
    "Return STRICT JSON only, no extra text, in this shape:",
    `{
  "name": "short title",
  "category": "domain",
  "description": "120-180 words, actionable milestones, why it matters",
  "durationDays": 30-90,
  "techStack": ["tech1","tech2",...],
  "budget": "TBD"
}`,
  ].join("\n");
};

const parseJsonFromText = (text: string): GenerateResponse => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in model response");
  return JSON.parse(match[0]) as GenerateResponse;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse | { message: string }>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!upstreamUrl) {
    return res
      .status(500)
      .json({ message: "Missing GENERATE_CONTENT_API_URL in environment." });
  }

  try {
    const body = req.body as GenerateRequest;
    const prompt = buildPrompt(body.recentProjects);

    const upstreamResponse = await fetch(`${upstreamUrl}/generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!upstreamResponse.ok) {
      const errText = await upstreamResponse.text();
      throw new Error(
        `Upstream error ${upstreamResponse.status}: ${errText || upstreamResponse.statusText}`
      );
    }

    const data = (await upstreamResponse.json()) as { content?: string };
    const content = data.content?.trim() || "";
    const parsed = parseJsonFromText(content);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("generateProject failed", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate project";
    return res.status(500).json({ message });
  }
}
