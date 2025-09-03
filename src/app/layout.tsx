
'use client';

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// export const metadata: Metadata = {
//   title: 'Jay De Rosales | Entrepreneur, Engineer, Speaker',
//   description:
//     'Helping people start again in business and life—with clarity, grit, and proven strategies.',
// };

const navLinks = [
  { href: "#info", label: "Info" },
  { href: "#videos", label: "Videos" },
  { href: "#index", label: "Index" },
  { href: "#contact", label: "Contact" },
];


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <title>Jay De Rosales | Entrepreneur, Engineer, Speaker</title>
        <meta
          name="description"
          content="Helping people start again in business and life—with clarity, grit, and proven strategies."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Sora:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased', 'bg-background text-foreground')}>
        <header className="fixed top-0 left-0 right-0 z-50 h-20">
          <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 text-white mix-blend-difference">
            <Link 
              href="/" 
              className="text-lg font-bold font-headline tracking-wider"
            >
              JDR
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-current after:scale-x-0 after:origin-center after:transition-transform hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Nav Trigger */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(true)} 
                className="hover:bg-white/20"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <div className={cn(
            "fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg md:hidden transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link href="/" className="text-lg font-bold font-headline tracking-wider text-white" onClick={() => setIsMenuOpen(false)}>
                JDR
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-white hover:bg-white/10 hover:text-white">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center space-y-8 pt-16">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-medium text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
