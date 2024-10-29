import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeDollarSign, TrendingDown } from "lucide-react";

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
    transactionType: "expense",
    description: "To były zakupy w lidlu",
    createdAt: new Date(),
    id: 2,
  },
  {
    category: "Healthcare",
    amount: 330,
    transactionType: "expense",
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
    transactionType: "expense",
    description: "To były zakupy w lidlu",
    createdAt: new Date(),
    id: 5,
  },
];

export function ExampleTable() {
  return (
    <Table className="w-full">
      <TableCaption>A list of your transactions on {}.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead className="w-[200px]">Description</TableHead>
          <TableHead className="text-left">Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.category}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-left">{item.amount}</TableCell>
            <TableCell>
              {item.transactionType === "income" ? (
                <BadgeDollarSign className="text-green-500" />
              ) : (
                <TrendingDown className="text-red-500" />
              )}{" "}
            </TableCell>
            <TableCell>{item.createdAt.getDate()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
