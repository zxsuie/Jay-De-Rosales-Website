"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="flex items-center justify-center min-h-screen text-center px-4">
      <div className="flex flex-col items-center">
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
          <Image
            src="https://picsum.photos/400/500"
            alt="Jay De Rosales"
            width={400}
            height={500}
            className="rounded-lg object-cover"
            data-ai-hint="portrait man"
          />
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-tight animate-fade-in" style={{ animationDelay: '500ms', opacity: 0, animationFillMode: 'forwards' }}>
          Jay De Rosales
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-foreground/80 animate-fade-in" style={{ animationDelay: '900ms', opacity: 0, animationFillMode: 'forwards' }}>
          Helping people start again in business and life—with clarity, grit, and proven strategies.
        </p>
      </div>
    </section>
  );
}
