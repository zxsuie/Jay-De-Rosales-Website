"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const storySections = [
  {
    text: "I believe in the capacity of a person to achieve great things.",
    image: { src: "https://picsum.photos/400/250?random=1", hint: "glowing horizon", position: "bottom-right", rotation: "-5deg" },
  },
  {
    text: "As a husband, I’ve learned that true strength begins with love, commitment, and patience.",
    image: { src: "https://picsum.photos/300/400?random=2", hint: "wedding rings", position: "top-left", rotation: "8deg" },
  },
  {
    text: "As a father, I believe in guiding with compassion, teaching with example, and dreaming with my children.",
    image: { src: "https://picsum.photos/450/300?random=3", hint: "child hand", position: "mid-right", rotation: "-3deg" },
  },
  {
    text: "As a businessman, I understand the value of vision, execution, and resilience in building something greater than myself.",
    image: { src: "https://picsum.photos/500/350?random=4", hint: "city skyline", position: "lower-left", rotation: "5deg" },
  },
  {
    text: "As a speaker, I share not just words, but stories that inspire and empower others to act.",
    image: { src: "https://picsum.photos/350/450?random=5", hint: "microphone silhouette", position: "top-right", rotation: "-6deg" },
  },
  {
    text: "Everything starts with a dream, a purpose and a goal, executed with a plan and worked out with a team. Pursued with unrelentless passion and grit. Everything is possible.",
    image: { src: "https://picsum.photos/400/400?random=6", hint: "galaxy stars", position: "center", rotation: "0deg" },
  },
];

const positionClasses = {
    "bottom-right": "bottom-1/4 right-1/4",
    "top-left": "top-1/4 left-1/4",
    "mid-right": "top-1/2 right-1/4 -translate-y-1/2",
    "lower-left": "bottom-1/4 left-1/4",
    "top-right": "top-1/4 right-1/4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
};

export function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (el) {
        const { top, height } = el.getBoundingClientRect();
        const scrollableHeight = height - window.innerHeight;
        const currentProgress = -top / scrollableHeight;
        setProgress(Math.max(0, Math.min(1, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const numSections = storySections.length;
  const sectionProgress = progress * numSections;

  return (
    <section id="approach" ref={containerRef} className="relative bg-black">
      <div className="approach-sticky-container">
        <div className="approach-content-wrapper">
          <div className="approach-image-container">
            {storySections.map((section, index) => {
              const start = index - 0.5;
              const end = index + 0.5;
              const opacity = sectionProgress > start && sectionProgress < end
                  ? 1 - Math.abs(sectionProgress - index) * 2
                  : 0;

              return (
                <div
                  key={index}
                  className={cn(
                    "approach-image w-[30vw] max-w-[400px] aspect-video",
                    positionClasses[section.image.position as keyof typeof positionClasses]
                  )}
                  style={{
                    opacity: opacity,
                    transform: `translate(-50%, -50%) rotate(${section.image.rotation}) scale(${1 + (opacity * 0.1)})`,
                    willChange: 'opacity, transform'
                  }}
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.hint}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full rounded-lg"
                    data-ai-hint={section.image.hint}
                  />
                </div>
              );
            })}
          </div>

          <div className="approach-text-container font-headline">
             <div className="approach-text-scroller">
                 {storySections.map((section, index) => {
                    const start = index - 0.75;
                    const end = index + 0.75;
                    const opacity = sectionProgress > start && sectionProgress < end
                        ? 1 - Math.abs(sectionProgress - index)
                        : 0;
                    
                    // Start scrolling up when its own section is halfway done
                    const scrollStart = index; 
                    const scrollEnd = index + 1;
                    const textScroll = Math.max(0, Math.min(1, (sectionProgress - scrollStart) / (scrollEnd - scrollStart)));

                    return (
                        <div key={index} className="approach-text" style={{ 
                            opacity: Math.pow(opacity, 2),
                            transform: `translateY(${(0.5 - textScroll) * 50}vh)`,
                            willChange: 'opacity, transform'
                        }}>
                           <p className={cn(index === numSections -1 && "text-4xl md:text-6xl font-extrabold")}>{section.text}</p>
                        </div>
                    );
                })}
             </div>
          </div>
          
           <div 
             className="approach-logo absolute inset-0 flex items-center justify-center text-white text-5xl font-bold font-headline"
             style={{
               opacity: sectionProgress > numSections - 0.5 ? (sectionProgress - (numSections - 0.5)) * 2 : 0,
               willChange: 'opacity'
             }}
           >
              JDR
           </div>
        </div>
      </div>
    </section>
  );
}
