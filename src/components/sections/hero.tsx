"use client";

export function Hero() {
  return (
    <section className="flex items-center justify-center min-h-screen text-center px-4">
      <div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-tight animate-fade-in" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
          Entrepreneur. Engineer. Speaker.
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-foreground/80 animate-fade-in" style={{ animationDelay: '700ms', opacity: 0, animationFillMode: 'forwards' }}>
          Helping people start again in business and life—with clarity, grit, and proven strategies.
        </p>
      </div>
    </section>
  );
}
