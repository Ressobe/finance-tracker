"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCurrencyStore } from "@/stores/use-currency-store";

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type DailyExpensesIncomesBarChart = {
  items: {
    date: string;
    income: number;
    expense: number;
  }[];
};

export function DailyExpensesIncomesBarChart({
  items,
}: DailyExpensesIncomesBarChart) {
  const currency = useCurrencyStore((state) => state.currency);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income and expense</CardTitle>
        <CardDescription>November 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={items}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickFormatter={(value) => `${value.toLocaleString()} ${currency}`}
              tickMargin={10}
              tickLine={true}
              padding={{ top: 50 }}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => {
                const date = new Date(value);
                console.log(date);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="income"
              stackId="a"
              fill="var(--color-income)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="expense"
              stackId="a"
              fill="var(--color-expense)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
