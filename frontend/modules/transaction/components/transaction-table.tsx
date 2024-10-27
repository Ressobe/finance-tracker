import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRightLeft, BadgeDollarSign, TrendingDown } from "lucide-react";

const invoices = [
  {
    category: "Healthcare",
    amount: 330,
    transactionType: "expense",
    description: "To były zakupy w lidlu",
    createdAt: new Date(),
    id: 1,
  },
  {
    category: "Healthcare",
    amount: 330,
    transactionType: "income",
    description: "To były zakupy w lidlu",
    createdAt: new Date(),
    id: 2,
  },
  {
    category: "Healthcare",
    amount: 330,
    transactionType: "income",
    description: "To były zakupy w lidlu",
    createdAt: new Date(),
    id: 3,
  },
  {
    category: "Healthcare",
    amount: 330,
    transactionType: "expense",
    description: "To były zakupy w lidlu",
    createdAt: new Date(),
    id: 4,
  },
  {
    category: "Healthcare",
    amount: 330,
    transactionType: "transfer",
    description: "To były zakupy w lidlu",
    createdAt: new Date(),
    id: 5,
  },
];

export function TransactionTable() {
  return (
    <Table className="w-full">
      <TableCaption>A list of your transactions on {}.</TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="w-1/5">Category</TableHead>
          <TableHead className="w-1/6">Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.category}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
            <TableCell>
              {item.transactionType === "income" && (
                <BadgeDollarSign className="text-green-500" />
              )}
              {item.transactionType === "expense" && (
                <TrendingDown className="text-red-500" />
              )}
              {item.transactionType === "transfer" && (
                <ArrowRightLeft className="text-violet-500" />
              )}
            </TableCell>
            <TableCell className="text-left">{item.amount} PLN</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
