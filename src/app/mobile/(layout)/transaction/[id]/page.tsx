"use client";
import { useTransactionDetail } from "@/hooks/useTransactionDetail";
import Image from "next/image";
import React, { useEffect } from "react";
import BG from "../../../../../../public/home-bg.png";
import WithSuspense from "@/components/common/withSuspense";
import CountUp from "react-countup";
import { TransactionTab } from "@/enums/transactionTab";
import { formatDate, formatTime } from "@/utils/frontend/date";
import ListSkeleton from "@/components/common/listSkeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRelevantRoute } from "@/lib/route";
import { Route } from "@/enums/route";

const TransactionDetail = ({ params: { id } }: { params: { id: string } }) => {
  const { fetchTransactionDetail, transaction, isFetching } =
    useTransactionDetail();

  useEffect(() => {
    fetchTransactionDetail(id);
  }, [id]);

  const getTransactionType = (type: string) => {
    return type === TransactionTab.INCOME.toString().toLowerCase()
      ? "bg-primary-transparent text-primary"
      : "bg-destructive-transparent text-destructive";
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex flex-col items-center justify-start">
        <Image src={BG} alt="background screen" className="w-screen" />
        <WithSuspense>
          {isFetching ? (
            <ListSkeleton />
          ) : (
            <>
              {transaction && (
                <div className="h-[70%] rounded-t-[30px] w-full bg-slate-50 absolute bottom-0">
                  <div className="flex flex-col justify-between items-center mt-5">
                    <div
                      className={`bg-opacity-40 text-sm px-3 py-1.5 rounded-full mb-2 ${getTransactionType(
                        transaction.type
                      )} `}
                    >
                      {transaction.type.toString().toUpperCase()}
                    </div>
                    <div className={`text-xl poppins font-semibold mb-12`}>
                      {transaction.type === TransactionTab.INCOME.toString().toLowerCase() ? "" : "- "}
                      <CountUp end={transaction.amount} />
                    </div>
                  </div>
                  <div className="flex flex-col px-4 font-medium text-foreground">
                    <div className="flex flex-row justify-between items-center py-4">
                      <div>Status</div>
                      <div>
                        {transaction.type === TransactionTab.INCOME.toString().toLowerCase()
                          ? "Income"
                          : "Expense"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center py-4">
                      <div>From</div>
                      <div>{transaction.categoryId.name}</div>
                    </div>
                    <div className="flex flex-row justify-between items-center py-4">
                      <div>Time</div>
                      <div>{formatTime(transaction.createdAt)}</div>
                    </div>
                    <div className="flex flex-row justify-between items-center py-4">
                      <div>Date</div>
                      <div>{formatDate(transaction.createdAt)}</div>
                    </div>
                  </div>
                  <div className="px-4">
                    <hr />
                    <div className="flex flex-row justify-between items-center py-4 mt-3">
                      <div>Total</div>
                      <div>{transaction.amount}</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button>
                      <Link href={getRelevantRoute(Route.HOME)}>
                        Back To Home
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </WithSuspense>
      </div>
    </div>
  );
};

export default TransactionDetail;
