import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Youtube } from "lucide-react";

function TiktokIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 7.25a6.11 6.11 0 0 0-3.34-2.26 6.45 6.45 0 0 0-4.16-1V12.7a3.42 3.42 0 0 1-3.42 3.42A3.42 3.42 0 0 1 6.66 12.7a3.42 3.42 0 0 1 3.42-3.42v-3a6.42 6.42 0 0 0-6.42 6.42A6.42 6.42 0 0 0 10.08 19a6.23 6.23 0 0 0 6.54-5.63V7.25Z" />
        </svg>
    )
}

export function Contact() {
  return (
    <section id="contact" className="min-h-[70vh] flex items-center justify-center py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Let’s Connect.</h2>
          <p className="mt-6 max-w-xl mx-auto text-lg text-foreground/80">
            Whether you’re building a business, looking for a startup coach, or exploring collaboration—I’d love to hear from you.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="https://www.messenger.com/channel/jderosales" target="_blank" rel="noopener noreferrer">
                        Join our Business Community
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="https://form.jotform.com/saucequotation/intensive-business-seminar" target="_blank" rel="noopener noreferrer">
                        Join Our Business Seminar
                    </Link>
                </Button>
            </div>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="mt-12 flex justify-center gap-6">
            <Link href="https://www.tiktok.com/@jayderosales" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <TiktokIcon className="h-7 w-7" />
            </Link>
            <Link href="https://www.youtube.com/c/JayDeRosales" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Youtube className="h-8 w-8" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
