import { Contact } from "@/components/contact/Contact";
import { Hero } from "@/components/hero/Hero";
import { IntroSection } from "@/components/intro/IntroSection";
import { Journey } from "@/components/journey/Journey";
import { Intro } from "@/components/layout/Intro";
import { MotionToggle } from "@/components/layout/MotionToggle";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { HowIWork } from "@/components/process/HowIWork";
import { Skills } from "@/components/skills/Skills";
import { Work } from "@/components/work/Work";

export default function Home() {
  return (
    <>
      <Intro />
      <ScrollProgress />
      <Navbar />
      <main id="top">
        <Hero />
        <IntroSection />
        <Work />
        <HowIWork />
        <Journey />
        <Skills />
      </main>
      <Contact />
      <MotionToggle />
    </>
  );
}
