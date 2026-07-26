"use client";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
      {/* Central content */}
      <div className="max-w-4xl text-center">
        {/* Badge */}
        <div className="stagger-1 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span className="text-sm text-gray-400">
            Powered by Gemini AI
          </span>
        </div>

        {/* Title */}
        <h1 className="stagger-2 mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl">
          Decode Any
          <br />
          <span className="gradient-text">GitHub Repo</span>
          <br />
          In Seconds
        </h1>

        {/* Description */}
        <p className="stagger-3 mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
          Paste a GitHub repository link and get an AI-powered deep analysis — 
          tech stack, contribution guides, key features, and more. 
          Understand any project without reading thousands of lines.
        </p>

        {/* CTA Button */}
        <div className="stagger-4">
          <button
            onClick={onEnter}
            
            className="glow-btn cursor-pointer group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-10 py-5 text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
          >
            <span>Deep Dive In</span>
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button> 
        </div>

        {/* Features grid */}
        <div className="stagger-5 mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Instant Analysis",
              desc: "Get a comprehensive summary in seconds, not hours",
            },
            {
              icon: "🧠",
              title: "AI-Powered",
              desc: "Gemini AI understands context, patterns, and architecture",
            },
            {
              icon: "🚀",
              title: "Contributor Ready",
              desc: "Find beginner-friendly ways to contribute to any project",
            },
          ].map((feat) => (
            <div
              key={feat.title}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.05]"
            >
              <div className="mb-3 text-3xl">{feat.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-500">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
