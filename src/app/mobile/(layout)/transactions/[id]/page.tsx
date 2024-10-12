"use client";
import { useTransactionDetail } from "@/hooks/useTransactionDetail";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { isMobile} from 'react-device-detect'

const TransactionDetail = ({
  params: { id },
  isDesktop = !isMobile,
  onClose,
}: {
  params: { id: string };
  isDesktop?: boolean;
  onClose: () => void;
}) => {
  const { fetchTransactionDetail, transaction, isFetching } =
    useTransactionDetail();
  const [showFullText, setshowFullText] = useState(false);

  const toggleShowFullText = () => {
    setshowFullText((prev) => !prev);
  };

  useEffect(() => {
    fetchTransactionDetail(id);
  }, [id]);

  const getTransactionType = (type: string) => {
    return type === TransactionTab.INCOME.toString().toLowerCase()
      ? "text-primary"
      : "text-destructive";
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col items-center justify-start">
        <Image
          src={BG}
          alt="background screen"
          className={`w-screen ${isDesktop ? "hidden" : ""}`}
        />
        <WithSuspense>
          {isFetching ? (
            <ListSkeleton />
          ) : (
            <>
              {transaction && (
                <div
                  className={`${
                    isDesktop ? "" : "absolute top-20 z-40 rounded-t-[30px]"
                  } h-full w-full bg-white`}
                >
                  <div
                    className={`${
                      isDesktop ? "pt-5 bg-[#59BFBF]" : ""
                    } flex flex-col items-center mt-4`}
                  >
                    <div
                      className={`text-sm px-3 py-1.5 rounded-full mb-2 bg-white ${getTransactionType(
                        transaction.type
                      )} `}
                    >
                      {transaction.type.toString().toUpperCase()}
                    </div>
                    <div
                      className={`text-xl poppins font-semibold mb-12 ${
                        isDesktop ? "text-white" : ""
                      }`}
                    >
                      {transaction.type ===
                      TransactionTab.INCOME.toString().toLowerCase()
                        ? ""
                        : "- "}
                      <CountUp end={transaction.amount} />
                    </div>
                  </div>
                  <div className="flex flex-col px-4 font-medium text-foreground">
                    {isDesktop && (
                      <>
                        <div className="font-bold text-xl mt-4">
                          Transaction Details
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                          <div>Transaction ID</div>
                          <div># {transaction._id}</div>
                        </div>
                      </>
                    )}
                    <div className="flex flex-row justify-between items-center py-3">
                      <div>Status</div>
                      <div>
                        {transaction.type ===
                        TransactionTab.INCOME.toString().toLowerCase()
                          ? "Income"
                          : "Expense"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center py-3">
                      <div>From</div>
                      <div>
                        {transaction.categoryId?.name || "Uncategorized"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center py-3">
                      <div>Time</div>
                      <div>{formatTime(transaction.createdAt)}</div>
                    </div>
                    <div className="flex flex-row justify-between items-center py-3">
                      <div>Date</div>
                      <div>{formatDate(transaction.createdAt)}</div>
                    </div>
                    {transaction.note && !isDesktop && (
                      <div className="flex flex-row justify-between items-start py-3">
                        <div>Note</div>
                        <div className="flex flex-col text-right">
                          <p
                            className={`${
                              showFullText ? "whitespace-normal" : "truncate"
                            } text-[14px] w-[140px]`}
                            style={{ wordWrap: "break-word" }}
                          >
                            {transaction.note}
                          </p>
                          {transaction.note.length > 20 && (
                            <p
                              onClick={toggleShowFullText}
                              className="text-[#59BFBF] text-[11px] cursor-pointer"
                            >
                              {showFullText ? "Show less" : "Show more"}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {transaction.note && isDesktop && (
                      <div className="flex flex-col gap-1 items-start py-3">
                        <div>Note</div>
                        <div className="text-sm text-gray-400">
                          {transaction.note}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="px-4">
                    <hr />
                    <div className="flex flex-row justify-between items-center py-4 mt-3">
                      <div>Total</div>
                      <div>{transaction.amount}</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    {!isDesktop ? (
                      <Button>
                        <Link href={getRelevantRoute(Route.HOME)}>
                          Back To Home
                        </Link>
                      </Button>
                    ) : (
                      <Button onClick={() => handleClose()}>Close</Button>
                    )}
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
