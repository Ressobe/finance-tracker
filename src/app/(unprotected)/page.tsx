import { Features } from "./_components/features";
import { Hero } from "./_components/hero";
import { Pricing } from "./_components/pricing";
import { Problem } from "./_components/problem";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Features />
      <Pricing />
    </>
  );
}
