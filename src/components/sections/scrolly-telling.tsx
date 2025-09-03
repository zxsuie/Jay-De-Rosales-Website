"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const storyParts = [
  {
    text: "I believe in the capacity of a person to achieve great things.",
    images: {
      background: { src: "https://picsum.photos/1920/1080?random=10", hint: "glowing horizon" },
    },
  },
  {
    text: "As a husband, I’ve learned that true strength begins with love, commitment, and patience.",
    images: {
      background: { src: "https://picsum.photos/1920/1080?random=11", hint: "warm bokeh lights" },
      midground: { src: "https://picsum.photos/800/600?random=12", hint: "couple holding hands silhouette" },
      foreground: { src: "https://picsum.photos/400/300?random=13", hint: "wedding rings" },
    },
  },
  {
    text: "As a father, I believe in guiding with compassion, teaching with example, and dreaming with my children.",
    images: {
      background: { src: "https://picsum.photos/1920/1080?random=14", hint: "sunset gradient" },
      midground: { src: "https://picsum.photos/800/600?random=15", hint: "father walking with child" },
      foreground: { src: "https://picsum.photos/400/300?random=16", hint: "child's hand reaching" },
    },
  },
  {
    text: "As a businessman, I understand the value of vision, execution, and resilience in building something greater than myself.",
    images: {
      background: { src: "https://picsum.photos/1920/1080?random=17", hint: "city skyline" },
      midground: { src: "https://picsum.photos/800/600?random=18", hint: "people collaborating" },
      foreground: { src: "https://picsum.photos/400/300?random=19", hint: "laptop graphs" },
    },
  },
  {
    text: "As a speaker, I share not just words, but stories that inspire and empower others to act.",
    images: {
      background: { src: "https://picsum.photos/1920/1080?random=20", hint: "blurred audience" },
      midground: { src: "https://picsum.photos/800/600?random=21", hint: "speaker on stage silhouette" },
      foreground: { src: "https://picsum.photos/400/300?random=22", hint: "microphone focus" },
    },
  },
  {
    text: "Everything starts with a dream, a purpose and a goal, executed with a plan and worked out with a team. Pursued with unrelentless passion and grit. Everything is possible.",
    images: {
      background: { src: "https://picsum.photos/1920/1080?random=23", hint: "galaxy starfield" },
      midground: { src: "https://picsum.photos/1920/1080?random=24", hint: "sunrise through clouds" },
      foreground: { src: "https://picsum.photos/800/600?random=25", hint: "rocket launch" },
    },
  },
];

const ParallaxLayer = ({
  src,
  hint,
  className,
  factor,
  scrollY,
}: {
  src: string;
  hint: string;
  className?: string;
  factor: number;
  scrollY: number;
}) => (
  <Image
    src={src}
    alt={hint}
    fill
    data-ai-hint={hint}
    className={cn("object-cover transition-opacity duration-1000", className)}
    style={{
      transform: `translate3d(0, ${-scrollY * factor}px, 0)`,
      willChange: 'transform',
    }}
  />
);

export function ScrollyTelling() {
  const [activePart, setActivePart] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const { current } = sectionRef;
      if (current) {
        const { top, height } = current.getBoundingClientRect();
        const partHeight = height / storyParts.length;
        const currentPart = Math.floor((-top + window.innerHeight / 2) / partHeight);
        
        if (currentPart >= 0 && currentPart < storyParts.length) {
          setActivePart(currentPart);
        }
      }
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStoryPart = storyParts[activePart];

  return (
    <section ref={sectionRef} id="journey" className="relative h-[600vh] w-full bg-black text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Layers */}
        {storyParts.map((part, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              activePart === index ? 'opacity-100' : 'opacity-0'
            )}
          >
            {part.images.background && (
              <ParallaxLayer
                src={part.images.background.src}
                hint={part.images.background.hint}
                factor={0.1}
                scrollY={scrollY}
              />
            )}
          </div>
        ))}
        {/* Midground Layers */}
        {storyParts.map((part, index) => (
           part.images.midground && (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 flex items-center justify-center",
                activePart === index ? 'opacity-50' : 'opacity-0'
              )}
            >
              <ParallaxLayer
                src={part.images.midground.src}
                hint={part.images.midground.hint}
                factor={0.3}
                scrollY={scrollY}
                className="w-1/2 h-1/2 relative"
              />
            </div>
           )
        ))}
        {/* Foreground Layers */}
         {storyParts.map((part, index) => (
           part.images.foreground && (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 flex items-end justify-center",
                activePart === index ? 'opacity-80' : 'opacity-0'
              )}
            >
              <ParallaxLayer
                src={part.images.foreground.src}
                hint={part.images.foreground.hint}
                factor={0.6}
                scrollY={scrollY}
                className="w-1/4 h-1/4 relative"
              />
            </div>
           )
        ))}

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {storyParts.map((part, index) => (
              <p
                key={index}
                className={cn(
                  'text-4xl md:text-5xl font-bold font-headline leading-tight transition-all duration-1000 absolute left-1/2 -translate-x-1/2 w-full px-4',
                  activePart === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                )}
              >
                {part.text}
              </p>
            ))}
          </div>
        </div>
        
        {/* Final Screen Overlay */}
        <div className={cn(
            "absolute inset-0 bg-black/70 flex flex-col items-center justify-center transition-opacity duration-1000",
            activePart === storyParts.length - 1 ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
            <div className="text-4xl font-bold font-headline">JDR</div>
             <p className="mt-4 text-lg text-white/80">Everything is possible.</p>
        </div>
      </div>
    </section>
  );
}
