"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent } from "../ui/card"
import { BarChartSkeleton } from "./barChartSkeleton"



const chartConfig = {
    expense: {
        label: "Expense",
        color: "var(--destructive)",
    },
    income: {
        label: "Income",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

type MonthlyData = {
    month: string;
    expense: number;
    income: number;
  };

export function BarChartComponent({chartData,isFetching} : {chartData:MonthlyData[],isFetching:boolean}) {
    return (
        <>
            <Card className="flex flex-col w-[60%]">
            <CardContent className="flex-1 pb-0">
                {isFetching ? (<BarChartSkeleton />) : 
                (<ChartContainer config={chartConfig} className="min-h-[250px]">
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
                </ChartContainer>)}
                
            </CardContent>
        </Card>
        </>
    )
}
