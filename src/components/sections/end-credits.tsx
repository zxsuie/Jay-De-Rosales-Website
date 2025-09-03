"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LetterReveal } from '@/components/ui/letter-reveal';

const storySections = [
  {
    text: "I believe in the capacity of a person to achieve great things.",
    images: [
      { src: "https://picsum.photos/400/300?random=1", dataAiHint: "glowing horizon", position: { top: '65%', left: '70%', transform: 'rotate(5deg)' } },
      { src: "https://picsum.photos/300/400?random=2", dataAiHint: "silhouette dreamer", position: { top: '10%', left: '15%', transform: 'rotate(-5deg)' } },
      { src: "https://picsum.photos/400/300?random=3", dataAiHint: "sunrise", position: { top: '50%', left: '80%', transform: 'translate(-50%, -50%) rotate(3deg)' } },
    ]
  },
  {
    text: "As a husband, I’ve learned that true strength begins with love, commitment, and patience.",
    images: [
      { src: "https://picsum.photos/300/400?random=4", dataAiHint: "wedding rings", position: { top: '15%', left: '75%', transform: 'rotate(4deg)' } },
      { src: "https://picsum.photos/400/300?random=5", dataAiHint: "couple silhouette", position: { top: '70%', left: '10%', transform: 'rotate(-2deg)' } },
      { src: "https://picsum.photos/400/300?random=6", dataAiHint: "home interior light", position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.1)' } },
    ]
  },
  {
    text: "As a father, I believe in guiding with compassion, teaching with example, and dreaming with my children.",
    images: [
        { src: "https://picsum.photos/400/300?random=7", dataAiHint: "child hand parent", position: { top: '55%', left: '80%', transform: 'rotate(2deg)' } },
        { src: "https://picsum.photos/300/400?random=8", dataAiHint: "family walking sunset", position: { top: '20%', left: '20%', transform: 'rotate(-3deg)' } },
        { src: "https://picsum.photos/400/300?random=9", dataAiHint: "father carrying child", position: { top: '70%', left: '50%', transform: 'translate(-50%, -50%)' } },
    ]
  },
  {
    text: "As a businessman, I understand the value of vision, execution, and resilience in building something greater than myself.",
    images: [
        { src: "https://picsum.photos/400/300?random=10", dataAiHint: "laptop charts", position: { top: '60%', left: '15%', transform: 'rotate(-4deg)' } },
        { src: "https://picsum.photos/300/400?random=11", dataAiHint: "boardroom table", position: { top: '15%', left: '70%', transform: 'rotate(3deg)' } },
        { src: "https://picsum.photos/400/300?random=12", dataAiHint: "city skyline night", position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.1)' } },
    ]
  },
  {
    text: "As a speaker, I share not just words, but stories that inspire and empower others to act.",
    images: [
        { src: "https://picsum.photos/300/400?random=13", dataAiHint: "microphone close-up", position: { top: '25%', left: '80%', transform: 'rotate(5deg)' } },
        { src: "https://picsum.photos/400/300?random=14", dataAiHint: "stage spotlight", position: { top: '70%', left: '20%', transform: 'rotate(-2deg)' } },
        { src: "https://picsum.photos/400/300?random=15", dataAiHint: "audience silhouette", position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } },
    ]
  },
  {
    text: "Everything starts with a dream, a purpose and a goal, executed with a plan and worked out with a team. Pursued with unrelentless passion and grit. Everything is possible.",
    images: [
        { src: "https://picsum.photos/400/300?random=16", dataAiHint: "rocket launch", position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.2)' } },
        { src: "https://picsum.photos/300/400?random=17", dataAiHint: "sunrise mountains", position: { top: '10%', left: '25%', transform: 'rotate(-4deg)' } },
        { src: "https://picsum.photos/400/300?random=18", dataAiHint: "galaxy starfield", position: { top: '65%', left: '75%', transform: 'rotate(3deg)' } },
    ]
  }
];

const SCENE_DURATION_MULTIPLIER = 6; // Adjust to control scroll length per scene

export function EndCreditsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [sceneHeight, setSceneHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
      const calculatedSceneHeight = viewportHeight * SCENE_DURATION_MULTIPLIER;
      setSceneHeight(calculatedSceneHeight);
      setContainerHeight(calculatedSceneHeight * numSections); 
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
  
  if (!isMounted || viewportHeight === 0 || sceneHeight === 0) {
    return <div style={{ height: `${storySections.length * SCENE_DURATION_MULTIPLIER * 100}vh` }} />;
  }
  
  let activeScene = sceneHeight > 0 ? Math.floor(scrollY / sceneHeight) : 0;
  activeScene = Math.max(0, Math.min(storySections.length - 1, activeScene));

  const scrollInScene = scrollY % sceneHeight;
  const progressInScene = sceneHeight > 0 ? scrollInScene / sceneHeight : 0;

  const textProgress = Math.max(0, Math.min(1, progressInScene * 2)); // Animate text in first half. Reduced from 3 to 2 to slow it down.
  
  const imageFadeDuration = 1 / (storySections[0].images.length + 1);
  
  const endThreshold = containerHeight - viewportHeight * 1.5;
  const logoOpacity = scrollY > endThreshold ? Math.min(1, (scrollY - endThreshold) / (viewportHeight * 0.5)) : 0;
  
  const bgFadeStart = 0;
  const bgFadeEnd = viewportHeight / 2;
  let bgOpacity = 0;
  if (scrollY >= bgFadeStart) {
    bgOpacity = Math.min(1, (scrollY - bgFadeStart) / (bgFadeEnd - bgFadeStart));
  }

  const currentSection = storySections[activeScene];

  return (
    <section 
      ref={containerRef} 
      className="end-credits-container"
      style={{ '--container-height': `${containerHeight}px` } as React.CSSProperties}
    >
      <div className="end-credits-sticky-wrapper">
        <div className="end-credits-background" style={{ opacity: bgOpacity }} />
        
        <div className="end-credits-content-wrapper font-headline">
          <div className="end-credits-text-container">
            <div className="mx-auto w-full max-w-[90%] md:max-w-[700px] text-center">
                {currentSection && (
                    <LetterReveal 
                        text={currentSection.text}
                        progress={textProgress}
                        baseColor="rgb(107 114 128)" // gray-500
                        revealColor="rgb(255 255 255)" // white
                    />
                )}
            </div>
          </div>
          
          <div className="end-credits-image-container" style={{ opacity: bgOpacity }}>
            {currentSection && currentSection.images.map((image, index) => {
              const imageStart = (index + 1) * imageFadeDuration;
              const imageEnd = imageStart + imageFadeDuration;

              let opacity = 0;
              if(progressInScene > imageStart && progressInScene < imageEnd) {
                 const progressInImage = (progressInScene - imageStart) / imageFadeDuration;
                 if(progressInImage < 0.5) opacity = progressInImage / 0.5;
                 else opacity = (1 - progressInImage) / 0.5;
              }
              opacity = Math.max(0, Math.min(1, opacity));
              const yOffset = (progressInScene - 0.5) * -20; // Parallax drift

              return (
                <Image
                  key={`${activeScene}-${index}`}
                  src={image.src}
                  alt={image.dataAiHint}
                  width={400}
                  height={300}
                  className="end-credits-image"
                  data-ai-hint={image.dataAiHint}
                  style={{
                    ...image.position,
                    opacity: opacity,
                    transform: `${image.position.transform || ''} translateY(${yOffset}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>

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
