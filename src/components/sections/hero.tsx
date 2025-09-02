"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen text-center px-4 overflow-hidden">
      <div className="relative flex flex-col items-center justify-center">
        <div
          className="relative z-10 mb-[-4rem] md:mb-[-6rem] animate-fade-in"
          style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Image
            src="https://picsum.photos/400/500"
            alt="Jay De Rosales"
            width={400}
            height={500}
            className="rounded-lg object-cover w-[250px] h-auto md:w-[400px]"
            data-ai-hint="portrait man"
            priority
          />
        </div>
        <div
          className="relative z-0 animate-fade-in"
          style={{ animationDelay: '500ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold font-headline leading-none">
            <span className="block">Jay De</span>
            <span className="block">Rosales</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
