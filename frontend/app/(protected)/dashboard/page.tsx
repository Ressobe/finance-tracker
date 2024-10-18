import { CreateAccountDialog } from "@/app/_components/create-account-dialog";
import { CreateTransactionDialog } from "@/app/_components/create-transaction-dialog";

export default function DashboardPage() {
  return (
    <section className="w-full max-w-xl">
      <CreateTransactionDialog type="expense" />
      <CreateAccountDialog />
    </section>
  );
}
