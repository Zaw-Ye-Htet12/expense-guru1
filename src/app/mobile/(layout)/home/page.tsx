"use client";
import React, { useEffect, useState, useRef } from "react";
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
import TransactionList from "@/components/mobile/transaction/transactionList";
import Logout from "@/components/common/logout";
import TotalBalance from "@/components/common/totalBalance";
import { TotalIncome } from "@/components/common/totalIncome";
import TotalExpense from "@/components/common/totalExpense";
import MonthSelectBox from "@/components/common/monthFilter";
import { useTab } from "@/hooks/useTab";
import BalanceCard from "./BalanceCard";
import dynamic from "next/dynamic";

const HomePage = () => {
  const { authUser } = useLogin();
  const imageRef = useRef<HTMLImageElement>(null);
  const [height, setHeight] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const { handleTabChange } = useTab();

  const handleOnChangeMonth = (value: string) => {
    setSelectedMonth(value);
  };

  useEffect(() => {
    handleTabChange(selectedMonth, "month");
  }, [selectedMonth]);

  useEffect(() => {
    const handleResize = () => {
      const viewHeight = window.innerHeight;
      const imageHeight = imageRef.current ? imageRef.current?.clientHeight : 0;
      const availableHeight = viewHeight - imageHeight - 100; // Adjust as needed
      setHeight(availableHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
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
                <Logout />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Image
          src={BG}
          ref={imageRef}
          alt="background image"
          className="w-screen"
          priority
          onLoad={() =>
            setTimeout(
              () =>
                setHeight(
                  window.innerHeight - imageRef.current?.clientHeight! - 100
                ),
              100
            )
          }
        ></Image>
      </div>
      <div className="flex flex-col absolute w-full top-[100px]">
        <div>
          <WithSuspense>
            <BalanceCard />
          </WithSuspense>
        </div>
        <div className="grow">
          <div className="flex px-4 py-2 flex-row justify-between items-center">
            <span className="text-md font-medium text-slate-500">
              Transaction History
            </span>
            <MonthSelectBox
              onChangeMonth={handleOnChangeMonth}
              selectedMonth={selectedMonth}
            />
          </div>
          <WithSuspense>
            <TransactionList height={height} />
          </WithSuspense>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false
})
