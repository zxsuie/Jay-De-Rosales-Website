"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const storySections = [
  {
    text: "I believe in the capacity of a person to achieve great things.",
    imageUrl: "https://picsum.photos/1920/1080?random=10",
    dataAiHint: "glowing horizon sunrise"
  },
  {
    text: "As a husband, I’ve learned that true strength begins with love, commitment, and patience.",
    imageUrl: "https://picsum.photos/1920/1080?random=11",
    dataAiHint: "couple silhouette sunset"
  },
  {
    text: "As a father, I believe in guiding with compassion, teaching with example, and dreaming with my children.",
    imageUrl: "https://picsum.photos/1920/1080?random=12",
    dataAiHint: "father child sunset"
  },
  {
    text: "As a businessman, I understand the value of vision, execution, and resilience in building something greater than myself.",
    imageUrl: "https://picsum.photos/1920/1080?random=13",
    dataAiHint: "city skyline business"
  },
  {
    text: "As a speaker, I share not just words, but stories that inspire and empower others to act.",
    imageUrl: "https://picsum.photos/1920/1080?random=14",
    dataAiHint: "public speaker stage"
  },
  {
    text: "Everything starts with a dream, a purpose and a goal, executed with a plan and worked out with a team. Pursued with unrelentless passion and grit. Everything is possible.",
    imageUrl: "https://picsum.photos/1920/1080?random=15",
    dataAiHint: "galaxy stars sunrise"
  },
  {
    text: "JDR", // Final Logo State
    imageUrl: "https://picsum.photos/1920/1080?random=15",
    dataAiHint: "galaxy stars sunrise"
  }
];

export function ApproachSection() {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const textScrollerRef = useRef<HTMLDivElement>(null);
  const numSections = storySections.length;

  useEffect(() => {
    // Set section height on client mount to avoid hydration errors
    setSectionHeight(window.innerHeight);

    const handleScroll = () => {
      if (scrollerRef.current && textScrollerRef.current && window.innerHeight > 0) {
        const { top, height } = scrollerRef.current.getBoundingClientRect();
        const scrollAmount = -top;
        const currentSectionHeight = window.innerHeight;
        
        if (scrollAmount >= 0 && scrollAmount <= height - currentSectionHeight) {
          const progress = scrollAmount / (height - currentSectionHeight);
          const currentSection = Math.min(Math.floor(progress * numSections), numSections - 1);
          setActiveSection(currentSection);

          // Calculate text scroll position
          const totalTextScroll = textScrollerRef.current.scrollHeight;
          const textScrollPosition = progress * (totalTextScroll + currentSectionHeight) - currentSectionHeight;

          textScrollerRef.current.style.transform = `translateY(${-textScrollPosition}px)`;
        
        } else if (scrollAmount > height - currentSectionHeight) {
          // Handle end state
           const finalSection = numSections -1;
           setActiveSection(finalSection);
           const endText = textScrollerRef.current.children[finalSection] as HTMLElement;
           if(endText) {
             const endPosition = endText.offsetTop - (currentSectionHeight / 2) + (endText.clientHeight / 2);
             textScrollerRef.current.style.transform = `translateY(${-endPosition}px)`;
           }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also handle resize to update sectionHeight if needed
    const handleResize = () => setSectionHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
  }, [numSections]);

  if (sectionHeight === 0) {
    // Render a placeholder or null until the client-side height is determined
    return <section id="approach" className="relative bg-black h-screen" />;
  }

  return (
    <section id="approach" className="relative bg-black">
      <div ref={scrollerRef} className="approach-scroller" style={{ height: `${numSections * sectionHeight}px`}}>
        <div className="approach-sticky-container">
          {/* Background Images */}
          {storySections.map((section, index) => (
            <div
              key={index}
              className={cn('approach-background', { 'active': activeSection === index })}
            >
              <Image
                src={section.imageUrl}
                alt={section.text.substring(0, 20)}
                fill
                priority={index === 0}
                className="object-cover"
                data-ai-hint={section.dataAiHint}
              />
               <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}

          {/* Scrolling Text */}
          <div className="approach-text-container">
            <div ref={textScrollerRef} className="approach-text-scroller font-headline">
              {storySections.map((section, index) => (
                <div key={index} className="approach-text" style={{ minHeight: `${sectionHeight}px`, display: 'flex', alignItems: 'center' }}>
                  <p className={cn(index === numSections -1 && "text-6xl font-extrabold")}>{section.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
