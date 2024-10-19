import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type AccountCardProps = {
  id: number;
  name: string;
};

export async function AccountCard({ id, name }: AccountCardProps) {
  return (
    <Link href={`/accounts/${id}`}>
      <Card className="bg-violet-500/10">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
