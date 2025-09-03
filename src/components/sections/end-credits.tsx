
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LetterReveal } from '@/components/ui/letter-reveal';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const storySections = [
  {
    text: "I believe in the capacity of a person to achieve great things.",
    images: [
      { src: "/1.jpg", dataAiHint: "glowing horizon", position: { top: '65%', left: '70%', transform: 'rotate(5deg)' } },
      { src: "/2.jpg", dataAiHint: "silhouette dreamer", position: { top: '10%', left: '15%', transform: 'rotate(-5deg)' } },
      { src: "/3.jpg", dataAiHint: "sunrise", position: { top: '50%', left: '80%', transform: 'translate(-50%, -50%) rotate(3deg)' } },
    ]
  },
  {
    text: "As a husband, I’ve learned that true strength begins with love, commitment, and patience.",
    images: [
      { src: "/4.jpg", dataAiHint: "wedding rings", position: { top: '15%', left: '75%', transform: 'rotate(4deg)' } },
      { src: "/5.jpg", dataAiHint: "couple silhouette", position: { top: '70%', left: '10%', transform: 'rotate(-2deg)' } },
      { src: "/6.jpg", dataAiHint: "home interior light", position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.1)' } },
    ]
  },
  {
    text: "As a father, I believe in guiding with compassion, teaching with example, and dreaming with my children.",
    images: [
        { src: "/7.jpg", dataAiHint: "child hand parent", position: { top: '55%', left: '80%', transform: 'rotate(2deg)' } },
        { src: "/8.jpg", dataAiHint: "family walking sunset", position: { top: '20%', left: '20%', transform: 'rotate(-3deg)' } },
        { src: "/9.jpg", dataAiHint: "father carrying child", position: { top: '70%', left: '50%', transform: 'translate(-50%, -50%)' } },
    ]
  },
  {
    text: "As a businessman, I understand the value of vision, execution, and resilience in building something greater than myself.",
    images: [
        { src: "/10.jpg", dataAiHint: "laptop charts", position: { top: '60%', left: '15%', transform: 'rotate(-4deg)' } },
        { src: "/11.jpg", dataAiHint: "boardroom table", position: { top: '15%', left: '70%', transform: 'rotate(3deg)' } },
        { src: "/12.jpg", dataAiHint: "city skyline night", position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.1)' } },
    ]
  },
  {
    text: "As a speaker, I share not just words, but stories that inspire and empower others to act.",
    images: [
        { src: "/13.jpg", dataAiHint: "microphone close-up", position: { top: '25%', left: '80%', transform: 'rotate(5deg)' } },
        { src: "/14.jpg", dataAiHint: "stage spotlight", position: { top: '70%', left: '20%', transform: 'rotate(-2deg)' } },
        { src: "/15.jpg", dataAiHint: "audience silhouette", position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } },
    ]
  },
  {
    text: "Everything starts with a dream, a purpose and a goal, executed with a plan and worked out with a team. Pursued with unrelentless passion and grit. Everything is possible.",
    images: [
        { src: "/2.jpg", dataAiHint: "rocket launch", position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.2)' } },
        { src: "/5.jpg", dataAiHint: "sunrise mountains", position: { top: '10%', left: '25%', transform: 'rotate(-4deg)' } },
        { src: "/8.jpg", dataAiHint: "galaxy starfield", position: { top: '65%', left: '75%', transform: 'rotate(3deg)' } },
    ]
  },
  {
    text: "- Jay De Rosales",
    subheading: "CEO of JD Foods",
    images: []
  }
];

const SCENE_DURATION_MULTIPLIER = 4; // Adjust to control scroll length per scene

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

  const textProgress = Math.max(0, Math.min(1, progressInScene * 2));
  
  const imageFadeDuration = 1 / ((storySections[activeScene]?.images?.length ?? 0) + 1);
  
  const bgFadeStart = 0;
  const bgFadeEnd = viewportHeight / 2;
  let bgOpacity = 0;
  if (scrollY >= bgFadeStart) {
    bgOpacity = Math.min(1, (scrollY - bgFadeStart) / (bgFadeEnd - bgFadeStart));
  }

  const whiteBgFadeStart = containerHeight - viewportHeight * 2;
  const whiteBgFadeEnd = containerHeight - viewportHeight;
  let whiteBgOpacity = 0;
  if (scrollY > whiteBgFadeStart) {
    whiteBgOpacity = Math.min(1, (scrollY - whiteBgFadeStart) / (whiteBgFadeEnd - whiteBgFadeStart));
  }


  const currentSection = storySections[activeScene];
  const isFinalScene = activeScene === storySections.length - 1;

  return (
    <section 
      ref={containerRef} 
      className="end-credits-container"
      style={{ '--container-height': `${containerHeight}px` } as React.CSSProperties}
    >
      <div className="end-credits-sticky-wrapper">
        <div className="end-credits-background" style={{ opacity: bgOpacity }} />
        <div className="end-credits-background-white" style={{ opacity: whiteBgOpacity }} />
        
        <div className={cn("end-credits-content-wrapper font-headline text-white")}>
          <div className="end-credits-text-container">
            <div className="mx-auto w-full max-w-[90%] md:max-w-[700px] text-center">
                {currentSection && (
                  <div>
                    <LetterReveal 
                        text={currentSection.text}
                        progress={textProgress}
                        baseColor={"rgb(107 114 128)"}
                        revealColor={"rgb(255 255 255)"}
                        fadeToBlackProgress={isFinalScene ? whiteBgOpacity : 0}
                        className={cn(isFinalScene && 'text-6xl')}
                    />
                    {isFinalScene && currentSection.subheading && (
                       <p 
                        className={cn("mt-4 text-xl transition-opacity duration-1000", textProgress > 0.5 ? "opacity-100" : "opacity-0")}
                        style={{ color: `rgb(${255 - 255 * whiteBgOpacity}, ${255 - 255 * whiteBgOpacity}, ${255 - 255 * whiteBgOpacity})` }}
                       >
                         {currentSection.subheading}
                       </p>
                    )}
                  </div>
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
                  width={450}
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
      </div>
    </section>
  );
}
