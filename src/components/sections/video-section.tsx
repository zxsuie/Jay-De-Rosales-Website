import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { ScrollReveal } from "../ui/scroll-reveal";

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
];

export function VideoSection() {
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
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto mt-16"
          >
            <CarouselContent>
              {videos.map((video) => (
                <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/1">
                  <div className="p-1">
                    <div className="relative aspect-video overflow-hidden rounded-lg group">
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
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
