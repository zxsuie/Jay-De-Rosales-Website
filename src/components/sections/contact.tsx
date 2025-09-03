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
            <path d="M16 8.5a4.5 4.5 0 0 1-9 0" />
            <path d="M12 14.5v-6" />
            <path d="M7.5 12a4.5 4.5 0 0 1 9 0" />
            <path d="M19 6.5a1 1 0 0 0-1-1h-2.5" />
            <path d="M5.5 15.5a1 1 0 0 0 1 1h2.5" />
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
