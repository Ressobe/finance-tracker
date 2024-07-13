import { auth } from "@/auth";
import LoginButton from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-background flex justify-between items-center p-4 w-full border-b border-purple-500/50">
      <Link
        href="/"
        className="flex items-center justify-center gap-x-6 font-bold"
      >
        <Image src="/rocket.png" width={60} height={60} alt="icon" />
        <h1 className="font-bold hidden md:block text-2xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-125 transform transition-all active:scale-110">
          {APP_NAME}
        </h1>
      </Link>
      {!session?.user ? (
        <LoginButton>
          <Button className="transform transition-all active:scale-110 hover:bg-muted-foreground ">
            Sign in
          </Button>
        </LoginButton>
      ) : (
        <LogoutButton>Logout</LogoutButton>
      )}
    </nav>
  );
}
