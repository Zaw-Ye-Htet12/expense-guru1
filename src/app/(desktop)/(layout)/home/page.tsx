'use client'
import React, { useMemo, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import TotalBalance from "@/components/common/totalBalance";
import Greeting from "@/components/common/greeting";
import FinanceCard from "@/components/desktop/financeCard";
import Image from "next/image";
import { TotalIncome } from "@/components/common/totalIncome";
import TotalExpense from "@/components/common/totalExpense";
import { useWallet } from "@/hooks/useWallet";
import { PieChartDonut } from "@/components/desktop/piechart";
import { BarChartComponent } from "@/components/desktop/barchart";
import { useTransaction } from "@/hooks/useTransaction";

type MonthlyData = {
  month: string;
  expense: number;
  income: number;
};



const Page = () => {
  const { authUser } = useLogin();
  const { totalBalance } = useWallet();
  const {transactions,isFetching} = useTransaction();

  const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Create the months array for the last 12 months dynamically
const months : any= [];
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
 const chartData = months
  const financeCards = [
    {
      label: "Total balance",
      img: { src: "/footerIcon/wallet.svg", alt: "Total balance icon" },
      children: <TotalBalance className={totalBalance < 0 ? "text-destructive" : "text-[#398C84]"} />,
    },
    {
      label: "Income",
      img: { src: "/income-icon.png", alt: "Income icon" },
      badgeClass: "bg-primary-transparent",
      children: <TotalIncome className="font-bold text-3xl text-[#398C84]" />,
    },
    {
      label: "Expense",
      img: { src: "/expense-icon.png", alt: "Expense icon" },
      badgeClass: "bg-destructive-transparent",
      children: (
        <TotalExpense className="font-bold text-3xl text-destructive" />
      ),
    },
  ];
  return (
    <>
      <div className="h-full -z-10">
      <div className="w-full h-32 relative">
        <Image
          alt="background"
          src={"/home-bg.png"}
          fill
          className="object-cover object-top"
        />
        <div className="z-50 absolute p-5 w-full">
          <div className="text-white">
            <Greeting className="text-xl font-semibold" />
            <div className="text-lg">{authUser.username}</div>
          </div>
          <div className="absolute top-24 left-0 flex justify-between gap-8 w-full mx-auto px-4">
            {financeCards.map((card, index) => (
              <FinanceCard
                key={card.label.length + index}
                label={card.label}
                img={card.img}
                badgeClass={card.badgeClass}
              >
                {card.children}
              </FinanceCard>
            ))}
          </div>
        </div>
        
      </div>

        <div className="mt-32 mx-5 mb-5 flex justify-between gap-6">
          <PieChartDonut />
          <BarChartComponent chartData={chartData} isFetching={isFetching}/>
        </div>
      </div>

    </>
  );
};

export default Page;