import { LOGO } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { AuthButton } from "@/components/auth/auth-button";

export async function Navbar() {
  return (
    <nav className="">
      <div className="bg-background flex justify-between items-center px-10 py-6 w-full sticky">
        <Link
          href="/"
          className="flex items-center justify-center gap-x-6 font-bold"
        >
          <Image src={LOGO} width={60} height={60} alt="icon" />
          <h1 className="font-bold text-center hidden md:block text-xl text-gradient hover:brightness-125 transform transition-all active:scale-110 bg-gradient-to-r from-emerald-500 to-lime-600">
            <div>Finance</div>
            <div>Tracker</div>
          </h1>
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
}
