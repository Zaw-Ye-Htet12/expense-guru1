"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent } from "../ui/card";
import { BarChartSkeleton } from "./barChartSkeleton";
import { useTransaction } from "@/hooks/useTransaction";
import { cn } from "@/lib/utils";

const chartConfig = {
  expense: {
    label: "Expense",
    color: "var(--destructive)",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type MonthlyData = {
  month: string;
  expense: number;
  income: number;
};

export function BarChartComponent({ className }: {className?: string}) {
  const { transactions, isFetching } = useTransaction();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Create the months array for the last 12 months dynamically
  const months: any = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthLabel = date.toLocaleString("default", { month: "long" });
    const yearLabel = date.getFullYear();
    months.unshift({
      month: `${monthLabel} ${yearLabel}`,
      expense: 0,
      income: 0,
    });
  }

  // Loop through the transactions to accumulate amounts for each month
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    const transactionMonth = transactionDate.getMonth();
    const transactionYear = transactionDate.getFullYear();

    // Calculate the month index relative to the current date
    const monthDiff =
      (currentYear - transactionYear) * 12 + (currentMonth - transactionMonth);

    // Only consider transactions within the last 12 months
    if (monthDiff >= 0 && monthDiff < 12) {
      if (transaction.type === "expense") {
        months[11 - monthDiff].expense += transaction.amount;
      } else if (transaction.type === "income") {
        months[11 - monthDiff].income += transaction.amount;
      }
    }
  });
  const chartData = months;
  return (
    <>
      <Card className="flex flex-col w-[100%] py-6 ">
        <CardContent className="flex-1 pb-0">
          {isFetching ? (
            <BarChartSkeleton />
          ) : (
            <ChartContainer config={chartConfig} className={cn(className, "min-h-[250px] pt-5")}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
}
