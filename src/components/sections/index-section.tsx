"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

const projects = [
    { 
        title: "Business Seminars", 
        description: "Teaching entrepreneurs in the Philippines to start again stronger.",
        imageUrl: "https://picsum.photos/600/400?random=1",
        dataAiHint: "business seminar audience"
    },
    { 
        title: "Authored Book", 
        description: "Sharing lessons on failure, resilience, and growth.",
        imageUrl: "https://picsum.photos/600/400?random=2",
        dataAiHint: "book cover"
    },
    { 
        title: "Food Business Ventures", 
        description: "Practical experience in building sustainable local businesses.",
        imageUrl: "https://picsum.photos/600/400?random=3",
        dataAiHint: "local cafe"
    },
    { 
        title: "Speaking Engagement", 
        description: "Inspiring audiences with talks on entrepreneurship and resilience.",
        imageUrl: "https://picsum.photos/600/400?random=4",
        dataAiHint: "public speaking"
    },
];

export function IndexSection() {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [imageHint, setImageHint] = useState<string | undefined>(undefined);
    const [transform, setTransform] = useState("perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)");
    const [position, setPosition] = useState<{ x: number, y: number } | null>(null);
    const containerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPct = (clientX - window.innerWidth / 2) / 40;
            const yPct = (clientY - window.innerHeight / 2) / 40;
            setTransform(`perspective(1000px) rotateY(${xPct}deg) rotateX(${-yPct}deg) scale(1)`);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, imageUrl: string, hint: string) => {
        setActiveImage(imageUrl);
        setImageHint(hint);
        if (containerRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            // Center the image over the link and shift it right
            setPosition({
                x: rect.left + rect.width / 2 - containerRect.left + 100, // Adjusted for rightward shift
                y: rect.top + rect.height / 2 - containerRect.top
            });
        }
    };

    return (
        <section id="index" className="py-24 sm:py-32 relative">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold font-headline">Core Work</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={150}>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
                            A curated collection of projects, ventures, and content that define my mission.
                        </p>
                    </ScrollReveal>
                </div>
                <div className="max-w-3xl mx-auto relative">
                    <ul ref={containerRef}>
                        {projects.map((project, index) => (
                            <li key={project.title}>
                                <ScrollReveal delay={index * 100}>
                                    <a 
                                        href="#" 
                                        className="block group py-8 border-b border-foreground/10 last:border-b-0"
                                        onMouseEnter={(e) => handleMouseEnter(e, project.imageUrl, project.dataAiHint)}
                                        onMouseLeave={() => setActiveImage(null)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-2xl md:text-3xl font-bold font-headline text-foreground transition-colors duration-300 group-hover:text-muted-foreground">
                                                    {project.title}
                                                </h3>
                                                <p className="mt-2 text-muted-foreground">{project.description}</p>
                                            </div>
                                            <ArrowRight className="h-8 w-8 text-muted-foreground opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                                        </div>
                                    </a>
                                </ScrollReveal>
                            </li>
                        ))}
                    </ul>
                     <div
                        className={cn(
                            "pointer-events-none absolute top-0 left-0 z-10 transition-opacity duration-300",
                            activeImage && position ? "opacity-100" : "opacity-0"
                        )}
                        style={position ? {
                            transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                        } : {}}
                    >
                        {activeImage && (
                            <div 
                                className="relative w-[400px] h-auto aspect-video rounded-lg overflow-hidden shadow-2xl"
                                style={{ transform: transform, willChange: 'transform' }}
                            >
                                <Image
                                    src={activeImage}
                                    alt="Project preview"
                                    width={400}
                                    height={250}
                                    className="object-cover"
                                    data-ai-hint={imageHint}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
