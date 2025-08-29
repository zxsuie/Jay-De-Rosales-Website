import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-8 bg-foreground/10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 text-sm">
          <p>&copy; {new Date().getFullYear()} Jay De Rosales</p>
          <p className="text-center">Empowering entrepreneurs with clarity, courage, and consistency.</p>
          <Link href="/seo-optimizer" className="hover:text-foreground transition-colors">SEO Tool</Link>
        </div>
      </div>
    </footer>
  );
}
