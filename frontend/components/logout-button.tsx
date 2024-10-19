"use client";

import { logoutAction } from "@/app/_actions/logut";
import { Button } from "@/_components/ui/button";

export function LogoutButton() {
  const handleClick = async () => {
    await logoutAction();
  };

  return <Button onClick={handleClick}>Logout</Button>;
}
