"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const storySections = [
  {
    text: "I believe in the capacity of a person to achieve great things.",
    image: { src: "https://picsum.photos/400/250?random=6", hint: "glowing horizon" },
    position: { top: '60%', left: '70%', width: '20vw', rotation: -5 }
  },
  {
    text: "As a husband, I’ve learned that true strength begins with love, commitment, and patience.",
    image: { src: "https://picsum.photos/300/200?random=7", hint: "wedding rings" },
    position: { top: '15%', left: '15%', width: '18vw', rotation: 8 }
  },
  {
    text: "As a father, I believe in guiding with compassion, teaching with example, and dreaming with my children.",
    image: { src: "https://picsum.photos/350/250?random=8", hint: "child holding hand" },
    position: { top: '50%', left: '80%', width: '22vw', rotation: -3 }
  },
  {
    text: "As a businessman, I understand the value of vision, execution, and resilience in building something greater than myself.",
    image: { src: "https://picsum.photos/450/280?random=9", hint: "city skyline" },
    position: { top: '70%', left: '5%', width: '25vw', rotation: 5 }
  },
  {
    text: "As a speaker, I share not just words, but stories that inspire and empower others to act.",
    image: { src: "https://picsum.photos/300/400?random=10", hint: "microphone silhouette" },
    position: { top: '20%', left: '75%', width: '15vw', rotation: 10 }
  },
  {
    text: "Everything starts with a dream, a purpose and a goal, executed with a plan and worked out with a team. Pursued with unrelentless passion and grit. Everything is possible.",
    image: { src: "https://picsum.photos/500/300?random=11", hint: "galaxy sunrise" },
    position: { top: '50%', left: '50%', width: '30vw', rotation: 0 }
  },
];

export function EndCreditsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const numSections = storySections.length;
      const sectionHeight = height / numSections;
      const scrollY = -top;
      
      let currentSection = Math.floor(scrollY / sectionHeight);
      currentSection = Math.max(0, Math.min(numSections - 1, currentSection));
      
      setActiveSection(currentSection);

      const scrollerHeight = height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollerHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const textTransform = `translateY(${100 - scrollProgress * 100}vh)`;

  return (
    <section id="end-credits" className="relative bg-black text-white end-credits-container" ref={containerRef}>
      <div className="end-credits-sticky-container">

        {/* Images Layer */}
        <div className="end-credits-image-container">
          {storySections.map((section, index) => (
            <div
              key={`img-${index}`}
              className={cn(
                "end-credits-image-block",
                { 'is-visible': index === activeSection }
              )}
              style={{
                top: `${section.position.top}`,
                left: `${section.position.left}`,
                width: section.position.width,
                transform: `translate(-50%, -50%) rotate(${section.position.rotation}deg) scale(${index === activeSection ? 1 : 0.9})`,
              }}
            >
              <Image
                src={section.image.src}
                alt={section.image.hint}
                width={500}
                height={300}
                className="rounded-lg shadow-2xl object-cover"
                data-ai-hint={section.image.hint}
              />
            </div>
          ))}
        </div>

        {/* Text Layer */}
        <div className="end-credits-text-wrapper">
          <div className="end-credits-text-scroller" style={{ transform: textTransform, paddingTop: '100vh' }}>
            {storySections.map((section, index) => (
              <div
                key={`txt-${index}`}
                className={cn(
                  "end-credits-text-block min-h-screen flex items-center justify-center text-center px-8"
                )}
              >
                <p className="text-3xl md:text-5xl font-headline leading-tight font-bold">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 z-20",
          activeSection === storySections.length - 1 && scrollProgress > 0.98 ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <p className="text-5xl font-bold font-headline">JDR</p>
        </div>

      </div>
    </section>
  );
}