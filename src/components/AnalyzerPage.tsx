"use client";

import { useState, useRef, useEffect } from "react";

interface RecentSearch {
  id: number;
  repoUrl: string;
  summary: string | null;
  createdAt: string;
}

export default function AnalyzerPage({ onBack }: { onBack: () => void }) {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/recent")
      .then((r) => r.json())
      .then((d) => {
        if (d.recent) setRecentSearches(d.recent);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSummary(data.summary);
        // Refresh recent
        const r = await fetch("/api/recent");
        const d = await r.json();
        if (d.recent) setRecentSearches(d.recent);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown to HTML
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bullet points
    html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
    // Numbered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> items in <ul>
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    // Paragraphs (lines that aren't already tags)
    html = html
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (
          trimmed.startsWith("<h") ||
          trimmed.startsWith("<ul") ||
          trimmed.startsWith("<li") ||
          trimmed.startsWith("</")
        )
          return line;
        return `<p>${trimmed}</p>`;
      })
      .join("\n");

    return html;
  };

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-8 sm:px-6">
      {/* Back button */}
      <div className="w-full max-w-4xl">
        <button
          onClick={onBack}
          className="stagger-1 mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-400 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Header */}
      <div className="stagger-1 mb-8 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-5xl">
          <span className="gradient-text">Analyze</span> a Repository
        </h1>
        <p className="mt-3 text-gray-500">
          Paste a GitHub URL below and let AI decode it for you
        </p>
      </div>

      {/* Input area — Gemini-like gradient border */}
      <div className="stagger-2 w-full max-w-3xl">
        <div className="gradient-border p-1">
          <div className="flex items-center gap-3 rounded-[14px] bg-[#0a0a0a] px-5 py-4">
            <svg
              className="h-6 w-6 shrink-0 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://github.com/username/repository"
              className="w-full bg-transparent text-base text-white placeholder-gray-600 outline-none sm:text-lg"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !url.trim()}
              className="glow-btn shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none sm:px-8"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      className="opacity-75"
                    />
                  </svg>
                  Analyzing
                </span>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <div className="typing-dot h-3 w-3 rounded-full bg-purple-500" />
            <div className="typing-dot h-3 w-3 rounded-full bg-indigo-500" />
            <div className="typing-dot h-3 w-3 rounded-full bg-pink-500" />
          </div>
          <p className="text-sm text-gray-500">
            Fetching README & generating AI summary...
          </p>
          <div className="mt-4 w-full max-w-3xl space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="shimmer h-4 rounded-lg"
                style={{ width: `${100 - i * 15}%` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="summary-card mt-8 w-full max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-400">Error</h3>
              <p className="mt-1 text-sm text-red-300/70">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Summary result */}
      {summary && (
        <div ref={resultRef} className="summary-card mt-10 w-full max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5.002 5.002 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AI Analysis</h2>
                <p className="text-xs text-gray-500">
                  Generated by Gemini AI
                </p>
              </div>
            </div>
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(summary) }}
            />
          </div>
        </div>
      )}

      {/* Recent searches */}
      {recentSearches.length > 0 && !loading && !summary && (
        <div className="stagger-3 mt-16 w-full max-w-3xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-400">
            Recent Analyses
          </h3>
          <div className="space-y-3">
            {recentSearches.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setUrl(s.repoUrl);
                  if (s.summary) setSummary(s.summary);
                }}
                className="group flex w-full items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition-all hover:border-purple-500/20 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <svg
                    className="h-5 w-5 text-gray-500 transition-colors group-hover:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">
                    {s.repoUrl.replace("https://github.com/", "")}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <svg
                  className="h-4 w-4 shrink-0 text-gray-600 transition-colors group-hover:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-20" />
    </div>
  );
}
