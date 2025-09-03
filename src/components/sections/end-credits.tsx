"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const storySections = [
  {
    text: "I believe in the capacity of a person to achieve great things.",
    imageUrl: "https://picsum.photos/400/300?random=1",
    dataAiHint: "glowing horizon",
    position: { top: '65%', left: '70%', transform: 'rotate(5deg)' }
  },
  {
    text: "As a husband, I’ve learned that true strength begins with love, commitment, and patience.",
    imageUrl: "https://picsum.photos/300/400?random=2",
    dataAiHint: "wedding rings",
    position: { top: '10%', left: '15%', transform: 'rotate(-5deg)' }
  },
  {
    text: "As a father, I believe in guiding with compassion, teaching with example, and dreaming with my children.",
    imageUrl: "https://picsum.photos/400/300?random=3",
    dataAiHint: "child hand parent",
    position: { top: '50%', left: '80%', transform: 'translate(-50%, -50%) rotate(3deg)' }
  },
  {
    text: "As a businessman, I understand the value of vision, execution, and resilience in building something greater than myself.",
    imageUrl: "https://picsum.photos/400/300?random=4",
    dataAiHint: "city skyline",
    position: { top: '70%', left: '10%', transform: 'rotate(-2deg)' }
  },
  {
    text: "As a speaker, I share not just words, but stories that inspire and empower others to act.",
    imageUrl: "https://picsum.photos/300/400?random=5",
    dataAiHint: "microphone silhouette",
    position: { top: '15%', left: '75%', transform: 'rotate(4deg)' }
  },
  {
    text: "Everything starts with a dream, a purpose and a goal, executed with a plan and worked out with a team. Pursued with unrelentless passion and grit. Everything is possible.",
    imageUrl: "https://picsum.photos/400/300?random=6",
    dataAiHint: "galaxy sunrise",
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.1)' }
  }
];

export function EndCreditsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if(typeof window !== 'undefined') {
        setViewportHeight(window.innerHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (viewportHeight > 0) {
      const numSections = storySections.length;
      const calculatedSectionHeight = viewportHeight; // Each section is one viewport high
      setSectionHeight(calculatedSectionHeight);
      setContainerHeight(calculatedSectionHeight * (numSections + 1)); // Add extra space at the end
    }
  }, [viewportHeight]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        setScrollY(Math.max(0, -top));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (viewportHeight === 0) {
    return <div style={{ height: `${storySections.length * 100}vh` }} />;
  }

  const textScrollTotal = storySections.length * sectionHeight;
  const textScrollProgress = Math.max(0, scrollY - viewportHeight / 2) / (containerHeight - viewportHeight);
  const textScrollY = viewportHeight - (textScrollProgress * textScrollTotal);
  
  const currentSectionIndex = Math.min(storySections.length, Math.floor(scrollY / sectionHeight));

  const endThreshold = containerHeight - viewportHeight * 1.5;
  const logoOpacity = scrollY > endThreshold ? Math.min(1, (scrollY - endThreshold) / (viewportHeight * 0.5)) : 0;
  
  // Calculate background fade-in
  const bgFadeStart = 0;
  const bgFadeEnd = viewportHeight / 2;
  let bgOpacity = 0;
  if (scrollY >= bgFadeStart) {
    bgOpacity = Math.min(1, (scrollY - bgFadeStart) / (bgFadeEnd - bgFadeStart));
  }

  return (
    <section 
      ref={containerRef} 
      className="end-credits-container"
      style={{ '--container-height': `${containerHeight}px` } as React.CSSProperties}
    >
      <div className="end-credits-sticky-wrapper">
        {/* Fading Background */}
        <div className="end-credits-background" style={{ opacity: bgOpacity }} />
        
        {/* Images */}
        <div className="end-credits-image-container" style={{ opacity: bgOpacity }}>
          {storySections.map((section, index) => {
            const sectionStart = index * sectionHeight;
            const sectionEnd = (index + 1) * sectionHeight;
            const progressInSection = (scrollY - sectionStart) / sectionHeight;
            
            let opacity = 0;
            if (scrollY >= sectionStart && scrollY < sectionEnd) {
              if (progressInSection < 0.3) {
                opacity = progressInSection / 0.3;
              } else if (progressInSection > 0.7) {
                opacity = (1 - progressInSection) / 0.3;
              } else {
                opacity = 1;
              }
            }
            opacity = Math.max(0, Math.min(1, opacity));

            const yOffset = (progressInSection - 0.5) * -40;

            return (
              <Image
                key={index}
                src={section.imageUrl}
                alt={section.dataAiHint}
                width={400}
                height={300}
                className="end-credits-image"
                data-ai-hint={section.dataAiHint}
                style={{
                  ...section.position,
                  opacity: opacity,
                  transform: `${section.position.transform || ''} translateY(${yOffset}px)`,
                }}
              />
            );
          })}
        </div>
        
        {/* Text Scroller */}
        <div 
            className="end-credits-text-scroller font-headline"
            style={{ 
              '--text-scroll-y': `${textScrollY}px`,
              opacity: bgOpacity,
            } as React.CSSProperties}
        >
            {storySections.map((section, index) => {
                const opacity = currentSectionIndex === index ? 1 : 
                                index < currentSectionIndex ? 0.3 : 
                                0.5;

                return (
                    <div 
                        key={index} 
                        className="end-credits-text" 
                        style={{'--section-height': `${sectionHeight}px`, display: 'flex', alignItems: 'center', justifyContent: 'center'} as React.CSSProperties}
                    >
                        <p style={{ opacity: opacity }}>{section.text}</p>
                    </div>
                );
            })}
        </div>

         {/* Logo Overlay at the very end */}
        <div 
            className="end-credits-logo"
            style={{ opacity: logoOpacity }}
        >
            JDR
        </div>
      </div>
    </section>
  );
}
