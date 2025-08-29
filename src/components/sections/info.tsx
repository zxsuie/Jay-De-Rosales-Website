import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Info() {
  return (
    <section id="info" className="py-24 sm:py-32">
      <ScrollReveal>
        <div className="container mx-auto px-4 text-center">
          <Separator className="mx-auto w-24 bg-foreground/10" />
          <div className="mt-16 max-w-3xl mx-auto space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              I am Jay De Rosales—an entrepreneur, engineer, and speaker. My mission is simple: to empower people to build resilient businesses, overcome failures, and embrace fresh starts with confidence.
            </p>
            <p>
              Beyond the stage and business boardroom, I’m a husband, a father, and a lifelong student of leadership. As a business mentor in the Philippines, I teach from real-world experience—wins, losses, and everything in between.
            </p>
          </div>
          <Separator className="mt-16 mx-auto w-24 bg-foreground/10" />
        </div>
      </ScrollReveal>
    </section>
  );
}
