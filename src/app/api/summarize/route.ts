import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { db } from "@/db";
import { searches } from "@/db/schema";

async function fetchReadme(repoUrl: string): Promise<string | null> {
  const base = repoUrl.replace(
    "https://github.com/",
    "https://raw.githubusercontent.com/"
  );

  const branches = ["main", "master"];
  const filenames = ["README.md", "readme.md", "README.rst", "README.txt"];

  for (const branch of branches) {
    for (const filename of filenames) {
      const url = `${base}/${branch}/${filename}`;
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(10000),
        });
        if (response.ok) {
          return await response.text();
        }
      } catch {
        continue;
      }
    }
  }
  return null;
}

async function summarizeRepo(readmeText: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are an expert software engineer.

Read the following GitHub README and provide a well-structured analysis:

1. **Quick Summary**: A one-sentence summary (5-second explanation).
2. **Tech Stack**: The project's tech stack as bullet points.
3. **Beginner Contributions**: Three beginner-friendly ways to contribute.
4. **Target Audience**: Who this project is best suited for.
5. **Key Features**: Top 5 features of this project.

Format the output using markdown with headers and bullet points for readability.

README:

${readmeText}`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return response.text ?? "No summary generated.";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repoUrl } = body as { repoUrl?: string };

    if (!repoUrl || !repoUrl.startsWith("https://github.com/")) {
      return NextResponse.json(
        { error: "Please provide a valid GitHub repository URL" },
        { status: 400 }
      );
    }

    const readme = await fetchReadme(repoUrl);
    if (!readme) {
      return NextResponse.json(
        { error: "README not found in this repository" },
        { status: 404 }
      );
    }

    const summary = await summarizeRepo(readme);

    // Save to database
    await db.insert(searches).values({
      repoUrl,
      summary,
    });

    return NextResponse.json({ summary, repoUrl });
  } catch (error) {
    console.error("DATABASE ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
