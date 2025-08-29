import { ScrollReveal } from "@/components/ui/scroll-reveal";

const approaches = [
  {
    title: "Simplicity",
    description: "I cut through the complexity to deliver clear, actionable strategies. Business growth shouldn't be a puzzle."
  },
  {
    title: "Real-World Lessons",
    description: "My guidance is forged from both my failures and successes. As a motivational speaker, I share what truly works."
  },
  {
    title: "People-First",
    description: "Lasting results come from empowering people. I focus on building strong teams and future leaders."
  }
];

export function Approach() {
  return (
    <section id="approach" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold font-headline">My Approach</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            I believe business is more than profit—it’s about building systems, people, and opportunities that last. Every talk, seminar, or strategy I deliver is grounded in these principles.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {approaches.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 150}>
              <div className="text-left">
                <h3 className="text-2xl font-bold font-headline">{item.title}</h3>
                <p className="mt-2 text-foreground/80">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
