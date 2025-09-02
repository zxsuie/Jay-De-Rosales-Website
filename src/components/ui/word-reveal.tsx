"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  threshold?: number;
}

export function WordReveal({
  text,
  className,
  delay = 0,
  wordDelay = 70,
  threshold = 0.2,
}: WordRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <p
      ref={ref}
      className={cn("transition-opacity duration-300", isVisible ? "opacity-100" : "opacity-0", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-all duration-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
          style={{ transitionDelay: `${delay + i * wordDelay}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}
