"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";

interface SubmitButtonProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
}

export function SubmitButton({ children, ref, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button ref={ref} disabled={pending} type="submit" {...props}>
      {children}
    </Button>
  );
}
