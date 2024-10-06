"use client";
import React from "react";
import Bg from "../../../../../public/home-bg.png";
import Image from "next/image";
import WithSuspense from "@/components/common/withSuspense";
import IncomeArrow from "../../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../../public/expense-arrow.png";
import { Button } from "@/components/ui/button";
import SegmentedControl from "@/components/ui/segmented-control";
import { TransactionTab } from "@/enums/transactionTab";
import { useTab } from "@/hooks/useTab";
import { useWallet } from "@/hooks/useWallet";
import { formatMoney } from "@/utils/frontend/money";
import CountUp from "react-countup";
import TransactionList from "@/components/mobile/transaction/transactionList";
import Link from "next/link";
import { getMobileRoute } from "@/lib/route";
import { Route } from "@/enums/route";

const WalletPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
        <Image src={Bg} alt="background" className="w-screen" />
        <WithSuspense>
          <WalletList />
        </WithSuspense>
      </div>
    </div>
  );
};

const WalletList = () => {
  const { handleTabChange } = useTab();
  const { totalBalance } = useWallet();
  return (
    <div className="absolute bottom-0 bg-slate-100 rounded-t-[40px] w-full h-[90%] px-3">
      <div className="text-center flex flex-col gap-4 items-center pt-6">
        <div className="text-lg text-slate-500">Total Balance</div>
        <div className="text-2xl font-semibold">
          <CountUp end={totalBalance} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-6 py-5">
        <Button>
          <Image src={IncomeArrow} alt="up arrow" />
          <Link href={getMobileRoute(Route.ADD) + "?tab=Income"}>Income</Link>
        </Button>
        <Button>
          <Image src={ExpenseArrow} alt="down arrow" />
          <Link href={getMobileRoute(Route.ADD) + "?tab=Expense"}>Expense</Link>
        </Button>
      </div>
      <SegmentedControl
        data={[
          TransactionTab.ALL,
          TransactionTab.INCOME,
          TransactionTab.EXPENSE,
        ]}
        defaultTab={TransactionTab.ALL}
        onSelectionChange={handleTabChange}
      />
      <TransactionList height={300} />
    </div>
  );
};

export default WalletPage;
