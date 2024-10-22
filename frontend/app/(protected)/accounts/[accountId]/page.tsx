import { getAccount } from "@/api/account";
import { Balance } from "@/components/balance";
import { notFound } from "next/navigation";

type AccountPageProps = {
  params: {
    accountId: number;
  };
};

export default async function AccountPage({ params }: AccountPageProps) {
  const { data, error } = await getAccount(params.accountId);
  if (error) {
    notFound();
  }

  const { name, currentBalance } = data;

  return (
    <section className="space-y-12">
      <h1 className="text-3xl font-bold">Account {name}</h1>
      <Balance amount={currentBalance} currencySymbol="PLN" />
    </section>
  );
}
