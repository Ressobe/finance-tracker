import { CircleCheck } from "lucide-react";

type SucessToastMessageProps = {
  message: string;
};

export function SucessToastMessage({ message }: SucessToastMessageProps) {
  return (
    <div className="flex items-center gap-4 text-lg">
      <CircleCheck className="text-green-500 w-12 h-12" />
      <span>{message}</span>
    </div>
  );
}
