import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type HeaderProps = {
  heading: string;
  label: string;
};

export function Header({ label, heading }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1
        className={cn(
          "text-3xl font-semibold text-gradient bg-gradient-to-r from-emerald-500 to-lime-600",
          font.className,
        )}
      >
        {heading}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
