import { Faq } from "./_components/faq";
import { Hero } from "./_components/hero";
import { Pricing } from "./_components/pricing";
import { TechStack } from "./_components/tech-stack";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <Pricing />
      <Faq />
    </>
  );
}
