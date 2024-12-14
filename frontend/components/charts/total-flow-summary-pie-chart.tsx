"use client";

import { Label, Pie, PieChart } from "recharts";

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
  transaction: {
    label: "Transaction",
    color: "hsl(var(--chart-1))",
  },
  saving: {
    label: "Saving",
    color: "hsl(var(--chart-2))",
  },
  transfer: {
    label: "Transfer",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type TotalFlowSummaryPieChartProps = {
  totalFlow: number;
  transactionTotal: number;
  transferTotal: number;
  savingTotal: number;
  transactionPercentage: number;
  transferPercentage: number;
  savingPercentage: number;
};

export function TotalFlowSummaryPieChart({
  transactionTotal,
  transferTotal,
  savingTotal,
  totalFlow,
}: TotalFlowSummaryPieChartProps) {
  const currency = useCurrencyStore((state) => state.currency);
  const chartData = [
    {
      name: "Transaction",
      type: "transaction",
      amount: transactionTotal,
      fill: "var(--color-transaction)",
    },
    {
      name: "Transfer",
      type: "transfer",
      amount: transferTotal,
      fill: "var(--color-transfer)",
    },
    {
      name: "Saving",
      type: "saving",
      amount: savingTotal,
      fill: "var(--color-saving)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total summary</CardTitle>
        <CardDescription>Total summary of your cash flow</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  formatter={(value, _, entry) => {
                    const type =
                      entry?.payload?.label ||
                      entry?.payload?.type ||
                      "Unknown";
                    return `${type.charAt(0).toUpperCase() + type.slice(1)}: ${value.toLocaleString()} ${currency.toUpperCase()}`;
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="amount"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalFlow.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-muted-foreground"
                        >
                          {currency.toUpperCase()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="type" />}
              className=""
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
