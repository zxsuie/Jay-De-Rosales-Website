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
  const letters = text.split("");

  return (
    <p className={cn("text-4xl md:text-5xl font-semibold leading-relaxed", className)}>
      {letters.map((letter, i) => {
        const letterProgress = Math.max(0, Math.min(1, (progress * letters.length - i)));
        
        // Simple linear interpolation for color
        const base = baseColor.match(/\d+/g)?.map(Number) || [0,0,0];
        const reveal = revealColor.match(/\d+/g)?.map(Number) || [255,255,255];
        
        const r = base[0] + (reveal[0] - base[0]) * letterProgress;
        const g = base[1] + (reveal[1] - base[1]) * letterProgress;
        const b = base[2] + (reveal[2] - base[2]) * letterProgress;
        
        const color = `rgb(${r}, ${g}, ${b})`;

        return (
          <span
            key={i}
            style={{ color }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        );
      })}
    </p>
  );
}
