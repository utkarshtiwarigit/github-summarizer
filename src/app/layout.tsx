import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepoLens — AI GitHub Repo Analyzer",
  description:
    "Paste a GitHub repository link and get an AI-powered deep analysis of the project in seconds.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
