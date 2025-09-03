
"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

export function Hero() {
  const [transform, setTransform] = useState("perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1.05, 1.05, 1.05)");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== 'undefined') {
        const { innerWidth: width, innerHeight: height } = window;
        const x = (e.clientX - width / 2) / 50; // Reduced sensitivity
        const y = (e.clientY - height / 2) / 50; // Reduced sensitivity

        setTransform(`perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen text-center px-4 overflow-hidden">
        {/* The image is positioned absolutely to act as a background layer */}
        <div
            className="absolute z-0 animate-fade-in"
            style={{ 
                animationDelay: '200ms', 
                opacity: 0, 
                animationFillMode: 'forwards',
                transformStyle: 'preserve-3d'
            }}
        >
            <Image
                src="https://picsum.photos/400/500"
                alt="Jay De Rosales"
                width={400}
                height={500}
                className="rounded-lg object-cover w-[250px] h-auto md:w-[400px] transition-transform duration-500 ease-out shadow-2xl"
                style={{ 
                transform: transform,
                willChange: 'transform'
                }}
                data-ai-hint="portrait man"
                priority
            />
        </div>
        
        {/* Wrapper to push text to the bottom */}
        <div className="relative z-10 flex flex-col justify-end w-full h-screen pb-20">
            {/* The heading is layered on top with a mix-blend-difference to invert colors */}
            <div
                className="animate-fade-in w-full mix-blend-difference text-white"
                style={{ animationDelay: '500ms', opacity: 0, animationFillMode: 'forwards' }}
            >
                <h1 className="text-8xl md:text-[10rem] lg:text-[14rem] font-bold font-headline leading-none">
                    <span className="block">Jay De</span>
                    <span className="block">Rosales</span>
                </h1>
            </div>
        </div>
    </section>
  );
}
