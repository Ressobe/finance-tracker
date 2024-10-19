import { ExampleTable } from "@/components/example-table";

export default function TransactionsPage() {
  return (
    <section className="space-y-12 w-full">
      <h1 className="text-3xl font-bold">Transactions History</h1>
      <ExampleTable />
    </section>
  );
}
