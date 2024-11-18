"use client";
import React, { useEffect, useState } from "react";
import BG from "../../../public/home-bg.png";
import WithSuspense from "@/components/common/withSuspense";
import CountUp from "react-countup";
import { TransactionTab } from "@/enums/transactionTab";
import { formatDate, formatTime } from "@/utils/frontend/date";
import ListSkeleton from "@/components/common/listSkeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRelevantRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import { isMobile } from "react-device-detect";
import { useTransactionDetail } from "@/hooks/useTransactionDetail";
import Image from "next/image";

const TransactionDetail = ({
  id,
  isDesktop = !isMobile,
  onClose,
}: {
  id: string;
  isDesktop?: boolean;
  onClose?: () => void;
}) => {
  const { fetchTransactionDetail, transaction, isFetching, updateTransaction } =
    useTransactionDetail();
  const [showFullText, setshowFullText] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [noteInput, setNoteInput] = useState<string>(transaction?.note || "");
  const [isSaving, setIsSaving] = useState(false);

  const toggleShowFullText = () => {
    setshowFullText((prev) => !prev);
  };

  const getTransactionType = (type: string) => {
    return type === TransactionTab.INCOME.toString().toLowerCase()
      ? "text-primary"
      : "text-destructive";
  };

  const handleClose = () => {
    onClose?.();
  };

  const handleEditTransaction = () => {
    setEditMode(true);
    setNoteInput(transaction?.note || "");
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteInput(e.target.value);
  };

  const handleSaveTransaction = async (note: string, id: string) => {
    setIsSaving(true);
    await updateTransaction({ note, id });
    setIsSaving(false);
    setEditMode(false);
  };

  useEffect(() => {
    fetchTransactionDetail(id);
  }, [id]);

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
                    {editMode || transaction.note ? (
                      <div className="flex flex-col gap-1 items-start py-3 overflow-x-hidden">
                        <div>Note</div>
                        {editMode ? (
                          <textarea
                            className="text-sm text-gray-400 w-full p-2 border rounded"
                            value={noteInput}
                            onChange={handleNoteChange}
                          />
                        ) : (
                          <div className="text-sm text-gray-400">
                            <p
                              className={`${
                                showFullText ? "whitespace-normal w-full" : "truncate max-w-60"
                              } text-[14px]`}
                              style={{wordBreak: 'break-word'}}
                            >
                              {transaction.note}
                            </p>
                            {transaction.note &&
                              transaction.note.length > 20 && (
                                <p
                                  onClick={toggleShowFullText}
                                  className="text-[#59BFBF] text-[11px] cursor-pointer"
                                >
                                  {showFullText ? "Show less" : "Show more"}
                                </p>
                              )}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div className="px-4">
                    <hr />
                    <div className="flex flex-row justify-between items-center py-4 mt-3">
                      <div>Total</div>
                      <div>{transaction.amount}</div>
                    </div>
                  </div>
                  <div
                    className={`${
                      isDesktop ? "flex-row" : "flex-col px-4 pt-3"
                    } flex gap-3 justify-center`}
                  >
                    {!isDesktop ? (
                      <Button>
                        <Link href={getRelevantRoute(Route.HOME)}>
                          Back To Home
                        </Link>
                      </Button>
                    ) : (
                      <Button onClick={() => handleClose()}>Close</Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={
                        editMode
                          ? () =>
                              handleSaveTransaction(noteInput, transaction._id)
                          : handleEditTransaction
                      }
                      disabled={isSaving}
                    >
                      {isSaving
                        ? "Saving..."
                        : editMode
                        ? "Save"
                        : transaction.note
                        ? "Edit Note"
                        : "Add Note"}
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
