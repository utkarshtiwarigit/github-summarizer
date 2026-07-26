"use client";

import { useEffect, useState } from "react";

const CODE_SNIPPETS = [
  'const app = express();',
  'import React from "react";',
  'git commit -m "fix"',
  'npm install --save',
  'docker build -t app .',
  'SELECT * FROM repos;',
  'async function fetch() {}',
  'export default App;',
  'const [state, setState]',
  'useEffect(() => {}, [])',
  'return <Component />',
  'kubectl apply -f deploy',
  'pipeline { agent any }',
  'def train(model):',
  'fn main() -> Result<>',
  'pub struct Repo {}',
  'class GitAnalyzer:',
  'console.log("ready")',
  '// TODO: optimize',
  'while (true) { learn(); }',
  'if err != nil { return }',
  'chmod +x deploy.sh',
  'ssh user@server',
  'tar -xzf release.tar',
  'curl -X POST /api',
  '{"status": "ok"}',
  'module.exports = config',
  'FROM node:20-alpine',
  'RUN npm ci --production',
  'EXPOSE 3000',
];

interface CodeBlock {
  id: number;
  text: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export default function MatrixBackground() {
  const [blocks, setBlocks] = useState<CodeBlock[]>([]);

  useEffect(() => {
    const generated: CodeBlock[] = [];
    for (let i = 0; i < 25; i++) {
      generated.push({
        id: i,
        text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        left: Math.random() * 100,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 20,
        size: 10 + Math.random() * 4,
      });
    }
    setBlocks(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(236,72,153,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Floating code */}
      {blocks.map((block) => (
        <div
          key={block.id}
          className="code-float absolute text-indigo-400/30"
          style={{
            left: `${block.left}%`,
            fontSize: `${block.size}px`,
            animationDuration: `${block.duration}s`,
            animationDelay: `${block.delay}s`,
          }}
        >
          {block.text}
        </div>
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
