"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel, { type EmblaCarouselType } from 'embla-carousel-react';
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { ScrollReveal } from "../ui/scroll-reveal";
import { cn } from '@/lib/utils';

const videos = [
  {
    id: 1,
    thumbnailUrl: "https://picsum.photos/1280/720?random=1",
    title: "Speaking Engagement Highlights",
    dataAiHint: "public speaking event"
  },
  {
    id: 2,
    thumbnailUrl: "https://picsum.photos/1280/720?random=2",
    title: "Startup Coaching Success Story",
    dataAiHint: "coaching session"
  },
  {
    id: 3,
    thumbnailUrl: "https://picsum.photos/1280/720?random=3",
    title: "A Message on Resilience",
    dataAiHint: "motivational speech"
  },
    {
    id: 4,
    thumbnailUrl: "https://picsum.photos/1280/720?random=4",
    title: "Business Fundamentals",
    dataAiHint: "business meeting"
  },
  {
    id: 5,
    thumbnailUrl: "https://picsum.photos/1280/720?random=5",
    title: "Leading with Empathy",
    dataAiHint: "team collaboration"
  },
];

const VideoCard = ({ video }: { video: typeof videos[0] }) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateY(0deg) rotateX(0deg)");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) / 25; // Sensitivity
        const y = (e.clientY - (top + height / 2)) / 25; // Sensitivity
        setTransform(`perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`);
      }
    };

    const handleMouseLeave = () => {
      setTransform("perspective(1000px) rotateY(0deg) rotateX(0deg)");
    };

    const currentRef = ref.current;
    currentRef?.addEventListener("mousemove", handleMouseMove);
    currentRef?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentRef?.removeEventListener("mousemove", handleMouseMove);
      currentRef?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
        ref={ref}
        className="relative aspect-video overflow-hidden rounded-lg group w-full h-full"
        style={{ transform: transform, transition: 'transform 0.2s ease-out', willChange: 'transform' }}
      >
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={video.dataAiHint}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <PlayCircle className="h-20 w-20 text-white/70 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white shadow-lg">{video.title}</h3>
        </div>
      </div>
  );
};


export function VideoSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });

  const [scale, setScale] = useState<(number | undefined)[]>([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach(loopPoint => {
          const target = loopPoint.target();
          if (index === loopPoint.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const scale = 1 - Math.abs(diffToTarget) * 0.4;
      return scale < 0 ? 0 : scale;
    });
    setScale(styles);
  }, [emblaApi]);


  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  return (
    <section id="videos" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">
            Watch Me in Action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 text-center">
            From keynote speeches to intimate coaching sessions, here’s a glimpse into my work.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="mt-16 overflow-hidden" ref={emblaRef}>
            <div className="flex" style={{ backfaceVisibility: 'hidden' }}>
              {videos.map((video, index) => (
                <div 
                  key={video.id} 
                  className="flex-[0_0_80%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_45%] min-w-0 pl-4 relative"
                >
                  <div
                    style={{
                        transform: `scale(${scale[index] ?? 0})`,
                        opacity: scale[index],
                        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
                    }}
                  >
                    <VideoCard video={video} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
