import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";

const projects = [
    { title: "Business Seminars", description: "Teaching entrepreneurs in the Philippines to start again stronger." },
    { title: "Authored Book", description: "Sharing lessons on failure, resilience, and growth." },
    { title: "Food Business Ventures", description: "Practical experience in building sustainable local businesses." },
    { title: "Digital Community", description: "Mentoring entrepreneurs through an online network of support." },
];

export function IndexSection() {
    return (
        <section id="index" className="py-24 sm:py-32">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">Index</h2>
                </ScrollReveal>
                
                <div className="mt-16 max-w-3xl mx-auto">
                    <ul>
                        {projects.map((project, index) => (
                            <li key={project.title}>
                                <ScrollReveal delay={index * 100}>
                                    <a href="#" className="block group py-8 border-b border-foreground/10 last:border-b-0">
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
                </div>
            </div>
        </section>
    );
}
