import { Separator } from "@/components/ui/separator";
import { WordReveal } from "@/components/ui/word-reveal";

export function Info() {
  const text1 = "I am Jay De Rosales—an entrepreneur, engineer, and speaker. My mission is simple: to empower people to build resilient businesses, overcome failures, and embrace fresh starts with confidence.";
  const text2 = "Beyond the stage and business boardroom, I’m a husband, a father, and a lifelong student of leadership. As a business mentor in the Philippines, I teach from real-world experience—wins, losses, and everything in between.";

  return (
    <section id="info" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <Separator className="mx-auto w-24 bg-foreground/10" />
          <div className="mt-16 max-w-3xl mx-auto space-y-8 text-xl text-foreground/80 leading-relaxed">
            <WordReveal text={text1} />
            <WordReveal text={text2} />
          </div>
          <Separator className="mt-16 mx-auto w-24 bg-foreground/10" />
        </div>
    </section>
  );
}
