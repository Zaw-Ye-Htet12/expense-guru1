"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Cell, Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTransaction } from "@/hooks/useTransaction"
import { tr } from "@faker-js/faker"
import { Skeleton } from "../ui/skeleton"

export const description = "A donut chart with text"

const generateColor = (index: number) => {
  const hue = (index * 137) % 360; // Spread colors evenly across the color wheel
  return `hsl(${hue}, 70%, 60%)`; // Creates a color with 70% saturation and 60% lightness
};

export function PieChartDonut() {
  const { transactions, isFetching } = useTransaction();
  const categoryCount = transactions.reduce((acc, transaction) => {
    const categoryName = transaction.categoryId?.name || "Uncategorized";
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryCount).map(([category, count], index) => ({
    name: category,
    value: count,
    fill: generateColor(index)
  }));

  const totalAmount = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const chartConfig = {

  } satisfies ChartConfig
  console.log(chartData);
  return (
    <Card className="flex flex-col w-[100%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Usage</CardTitle>
        <CardDescription>Category usage based on transaction counts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length !== 0 || isFetching ? 
        <>
        {isFetching ? (
          <div className="flex justify-center items-center h-full">
            <Skeleton className="bg-slate-200 rounded-full w-[200px] h-[200px] mb-12 mt-5" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} /> // Apply dynamically generated color
                ))}
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
                            {totalAmount.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            category used
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
        </>
        : (<div className="flex justify-center items-center h-full text-primary text-xl">
          No Category Used yet
        </div>)}
        

      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          This is the chart of category used of making transactions.
        </div>
      </CardFooter>
    </Card>
  )
}
