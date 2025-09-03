"use client";

import { cn } from "@/lib/utils";

interface LetterRevealProps {
  text: string;
  progress: number;
  baseColor?: string;
  revealColor?: string;
  className?: string;
}

export function LetterReveal({
  text,
  progress,
  baseColor = "rgb(156 163 175)", // gray-400
  revealColor = "rgb(255 255 255)", // white
  className,
}: LetterRevealProps) {
  const words = text.split(" ");

  return (
    <p className={cn("text-2xl md:text-4xl lg:text-5xl font-semibold leading-relaxed md:leading-relaxed", className)}>
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;
        const wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)));

        return (
          <span key={i} className="inline-block mr-3">
            {word.split("").map((letter, j) => {
              const letterProgress = Math.max(0, Math.min(1, (wordProgress * word.length - j)));
              
              const base = baseColor.match(/\d+/g)?.map(Number) || [0,0,0];
              const reveal = revealColor.match(/\d+/g)?.map(Number) || [255,255,255];
              
              const r = base[0] + (reveal[0] - base[0]) * letterProgress;
              const g = base[1] + (reveal[1] - base[1]) * letterProgress;
              const b = base[2] + (reveal[2] - base[2]) * letterProgress;
              
              const color = `rgb(${r}, ${g}, ${b})`;

              return (
                <span key={j} style={{ color }}>
                  {letter}
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}
