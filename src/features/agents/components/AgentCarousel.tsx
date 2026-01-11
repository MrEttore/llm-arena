import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { AgentSettings } from "@/features/agents/components";

const TOTAL_AGENTS = 2;

export default function AgentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? TOTAL_AGENTS - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === TOTAL_AGENTS - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-0 rounded-xl border border-white/10 bg-white/10 p-3 shadow-sm backdrop-blur sm:p-4">
      {/* Navigation Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white/80 sm:text-base">Configure your AI agents</p>

        <div className="flex items-center gap-2">
          {/* Indicators */}
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_AGENTS }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to agent ${i + 1}`}
              />
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="rounded-lg bg-white/10 p-1.5 backdrop-blur transition-all duration-300 hover:bg-white/20 active:scale-95"
            aria-label="Previous agent"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="rounded-lg bg-white/10 p-1.5 backdrop-blur transition-all duration-300 hover:bg-white/20 active:scale-95"
            aria-label="Next agent"
          >
            <ChevronRight size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: TOTAL_AGENTS }).map((_, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <AgentSettings agentIndex={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
