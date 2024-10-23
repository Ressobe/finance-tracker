import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SavingGoalForm } from "./saving-goal-form";

type SavingGoalDialogProps = {
  children: React.ReactNode;
  // defaultValues?: SavingGoal
};

export function SavingGoalDialog({ children }: SavingGoalDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create your new <span className="text-violet-500">saving goal</span>
          </DialogTitle>
          <DialogDescription>
            Create your new goal to track progress
          </DialogDescription>
        </DialogHeader>
        <SavingGoalForm />
      </DialogContent>
    </Dialog>
  );
}
