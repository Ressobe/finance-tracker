import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SavingGoalModel } from "@/types/saving-goal";
import { SavingTransactionForm } from "./saving-transaction-form";

type SavingTransactionDialogProps = {
  savingGoal: SavingGoalModel;
  children: React.ReactNode;
};

export function SavingTransactionDialog({
  savingGoal,
  children,
}: SavingTransactionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new saving transaction</DialogTitle>
          <DialogDescription>
            New saving transaction for{" "}
            <span className="text-violet-500 font-bold">{savingGoal.name}</span>
          </DialogDescription>
        </DialogHeader>
        <SavingTransactionForm />
      </DialogContent>
    </Dialog>
  );
}
