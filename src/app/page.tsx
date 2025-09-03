import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Info } from '@/components/sections/info';
import { IndexSection } from '@/components/sections/index-section';
import { ApproachSection } from '@/components/sections/approach';
import { Contact } from '@/components/sections/contact';
import { VideoSection } from '@/components/sections/video-section';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex-grow">
        <Hero />
        <Info />
        <VideoSection />
        <IndexSection />
        <ApproachSection />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
