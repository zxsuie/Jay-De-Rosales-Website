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
      setContainerHeight(calculatedSectionHeight * numSections);
    }
  }, [viewportHeight]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        setScrollY(-top);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (viewportHeight === 0) {
    return <div className="h-[500vh] bg-black" />;
  }

  const textScrollY = viewportHeight - (scrollY / (containerHeight - viewportHeight)) * (containerHeight + viewportHeight);
  
  const currentSectionIndex = Math.floor(scrollY / sectionHeight);

  return (
    <section 
      ref={containerRef} 
      className="end-credits-container"
      style={{ '--container-height': `${containerHeight}px` } as React.CSSProperties}
    >
      <div className="end-credits-sticky-wrapper">
        {/* Images */}
        <div className="end-credits-image-container">
          {storySections.map((section, index) => {
            const progressInSection = (scrollY - (index * sectionHeight)) / sectionHeight;
            let opacity = 0;
            if (scrollY >= index * sectionHeight && scrollY < (index + 1) * sectionHeight) {
              // Fade in for the first 30%, fade out for the last 30%
              if (progressInSection < 0.3) {
                opacity = progressInSection / 0.3;
              } else if (progressInSection > 0.7) {
                opacity = (1 - progressInSection) / 0.3;
              } else {
                opacity = 1;
              }
            }
            opacity = Math.max(0, Math.min(1, opacity));

            const yOffset = (progressInSection - 0.5) * -50; // slight parallax drift

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
                  transform: `${section.position.transform} translateY(${yOffset}px)`,
                }}
              />
            );
          })}
        </div>
        
        {/* Text */}
        <div 
            className="end-credits-text-scroller font-headline"
            style={{ '--text-scroll-y': `${textScrollY}px` } as React.CSSProperties}
        >
            {storySections.map((section, index) => {
                 const progressInSection = (scrollY - (index * sectionHeight)) / sectionHeight;
                 const opacity = index === currentSectionIndex ? 1 : 0.5;

                return (
                    <div 
                        key={index} 
                        className="end-credits-text" 
                        style={{'--section-height': `${sectionHeight}px`} as React.CSSProperties}
                    >
                        <p style={{ opacity: opacity }}>{section.text}</p>
                    </div>
                );
            })}
        </div>

         {/* Logo Overlay */}
        <div 
            className="end-credits-logo"
            style={{ 
                opacity: scrollY > containerHeight - viewportHeight * 1.5 ? 1 : 0
            }}
        >
            JDR
        </div>
      </div>
    </section>
  );
}
