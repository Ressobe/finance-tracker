import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";

export async function AuthButton() {
  const session = await auth();
  return (
    <>
      {!session?.user ? (
        <LoginButton>
          <Button className="transform transition-all active:scale-110 hover:bg-muted-foreground rounded-md">
            Get started now
          </Button>
        </LoginButton>
      ) : (
        <LogoutButton>Dashboard</LogoutButton>
      )}
    </>
  );
}
