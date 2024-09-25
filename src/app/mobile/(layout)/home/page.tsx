"use client";
import React from "react";
import BG from "../../../../../public/home-bg.png";
import Image from "next/image";
import { useLogin } from "@/hooks/useLogin";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WithSuspense from "@/components/common/withSuspense";
import IncomeArrow from "../../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../../public/expense-arrow.png";
import TransactionList from "@/components/mobile/transaction/transactionList";
import Logout from "@/components/common/logout";

const HomePage = () => {
  const { authUser } = useLogin();
  return (
    <WithSuspense>
      <div className="relative">
        <div className="relative">
          <div className="flex flex-row justify-between items-start p-5 absolute top-0 left-0 right-0 text-white">
            <div className="flex flex-col">
              <span className="text-md">Good morning</span>
              <div className="text-2xl font-bold">{authUser.username}</div>
            </div>
            <div>
              <Popover>
                <PopoverTrigger>
                  <div>
                    <DotsHorizontalIcon fontSize={30}></DotsHorizontalIcon>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-24 mr-5 bg-white border-none p-2">
                  <Logout/>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Image
            src={BG}
            alt="background image"
            className="w-screen"
            priority
          ></Image>
        </div>
        <div className="flex flex-col absolute w-full top-[100px]">
          <div>
            <BalanceCard />
          </div>
          <div className="grow">
            <span className="text-md font-medium text-slate-500 px-4">
              Transaction History
            </span>
            <TransactionList/>
          </div>
        </div>  
      </div>
    </WithSuspense>
  );
};

export default HomePage;

const BalanceCard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[180px] w-[90%] rounded-xl p-3 bg-[#2f7e79] flex flex-col justify-between items-start">
        <div className="text-white">
          <span className="text-base poppins">Total Balance</span>
          <div className="text-xl font-bold poppins">3,000,000</div>
        </div>
        <div className="flex justify-between w-full poppins">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-300">Income</span>
              <Image src={IncomeArrow} alt="income show arrow" />
            </div>
            <div className="text-white">3,000</div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-300">Expense</span>
              <Image
                src={ExpenseArrow}
                alt="income show arrow"
                className="text-white"
              />
            </div>
            <div className="text-white">3,000</div>
          </div>
        </div>
      </div>
    </div>
  );
};
