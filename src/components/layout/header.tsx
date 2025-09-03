"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#info", label: "Info" },
  { href: "#videos", label: "Videos" },
  { href: "#index", label: "Index" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const textClasses = "text-white";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="w-full mix-blend-difference">
          <div className="flex items-center justify-between">
              <Link 
                href="/" 
                className={cn("text-lg font-bold font-headline tracking-wider", textClasses)}
              >
                JDR
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn("text-sm font-medium relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-current after:scale-x-0 after:origin-center after:transition-transform hover:after:scale-x-100", textClasses)}
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
                  className={cn("hover:bg-black/10", textClasses)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
          "fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden transition-opacity duration-300",
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
    </header>
  );
}
