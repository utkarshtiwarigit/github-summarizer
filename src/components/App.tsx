"use client";

import { useState, useCallback } from "react";
import MatrixBackground from "./MatrixBackground";
import LandingPage from "./LandingPage";
import AnalyzerPage from "./AnalyzerPage";

type Page = "landing" | "analyzer";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [transitioning, setTransitioning] = useState(false);
  const [animClass, setAnimClass] = useState("page-enter");

  const transitionTo = useCallback(
    (target: Page) => {
      if (transitioning) return;
      setTransitioning(true);
      setAnimClass("page-exit");

      setTimeout(() => {
        setCurrentPage(target);
        setAnimClass("page-enter");
        setTransitioning(false);
      }, 600);
    },
    [transitioning]
  );

  return (
    <div className="relative min-h-screen bg-black text-white">
      <MatrixBackground />

      <div className={animClass}>
        {currentPage === "landing" ? (
          <LandingPage onEnter={() => transitionTo("analyzer")} />
        ) : (
          <AnalyzerPage onBack={() => transitionTo("landing")} />
        )}
      </div>
    </div>
  );
}
