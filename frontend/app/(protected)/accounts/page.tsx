import { AccountCard } from "@/components/account-card";

export default function AccountPage() {
  return (
    <section className="space-y-12">
      <h1 className="text-3xl font-bold">All Accounts</h1>
      <div>
        <AccountCard id={2332} name="Wydatki" />
      </div>
    </section>
  );
}
