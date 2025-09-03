import { Separator } from "@/components/ui/separator";
import { WordReveal } from "@/components/ui/word-reveal";
import { Youtube } from "lucide-react";
import { ScrollReveal } from "../ui/scroll-reveal";

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

export function Info() {
  const text1 = "I am Jay De Rosales—an entrepreneur, engineer, and speaker. My mission is simple: to empower people to build resilient businesses, overcome failures, and embrace fresh starts with confidence.";
  const text2 = "Beyond the stage and business boardroom, I’m a husband, a father, and a lifelong student of leadership. As a business mentor in the Philippines, I teach from real-world experience—wins, losses, and everything in between.";
  const totalDelay = (text1.split(" ").length + text2.split(" ").length) * 70;

  return (
    <section id="info" className="min-h-screen flex flex-col items-center justify-center py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <Separator className="mx-auto w-24 bg-foreground/10" />
          <div className="mt-16 max-w-3xl mx-auto space-y-8 text-2xl text-foreground/80 leading-relaxed">
            <WordReveal text={text1} threshold={1.0} />
            <WordReveal text={text2} threshold={1.0} delay={text1.split(" ").length * 70} />
          </div>
          <ScrollReveal delay={totalDelay} threshold={1.0}>
            <div className="mt-12 flex justify-center items-center gap-6">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <TiktokIcon className="h-7 w-7" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Youtube className="h-8 w-8" />
                </a>
            </div>
          </ScrollReveal>
          <Separator className="mt-16 mx-auto w-24 bg-foreground/10" />
        </div>
    </section>
  );
}
