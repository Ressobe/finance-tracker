import { AuthButton } from "@/components/auth/auth-button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="text-center">
      <h2 className="text-6xl font-bold tracking-tighter">
        Track your all finances
      </h2>
      <h2 className="text-6xl font-bold tracking-tighter">In one place</h2>
      <p className="py-4 text-sm text-muted-foreground">
        Take control of your finances effortlessly with our intuitive management
        app.
      </p>
      <AuthButton />
      <div className="pt-10">
        <Image
          src="/example.png"
          width={800}
          height={800}
          alt="dkdk"
          className="border-8 rounded-md"
        />
      </div>
    </section>
  );
}
