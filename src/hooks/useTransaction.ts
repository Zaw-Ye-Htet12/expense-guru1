import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import useAxiosPrivate from "./useAxiosPrivate";
import { Transaction } from "@/types/transaction";
import { TransactionType } from "@/validations/transaction/create";
import { useSearchParams } from "next/navigation";
import { TransactionTab } from "@/enums/transactionTab";
import { HttpStatus } from "@/enums/httpStatus";
import { useTab } from "./useTab";
import { sanitizeMoney } from "@/utils/frontend/money";
import { ScheduleTransactionType } from "@/validations/transaction/schedule";

export const useTransaction = () => {
    const axiosPrivateInstance = useAxiosPrivate();
    const { successToast, errorToast } = useToastHook();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const { currentTabParam, currentMonthParam } = useTab();

    const fetchTransactions = useCallback(async (params?: { [key: string]: any }) => {
        setIsFetching(true);
        try {
            const response = await axiosPrivateInstance.get(`/transaction`, {
                params,
            });
            setTransactions(response.data.data);
        } catch (error: any) {
            setTransactions([])
            return errorToast(error.response.data.message || error.response.data.error)
        } finally {
            setIsFetching(false);
        }
    }, [errorToast])

    const createTransaction = useCallback(async (payload: TransactionType) => {
        try {
            const body = {
                categoryId: payload.categoryId,
                amount: sanitizeMoney(payload.amount),
                type: payload.type,
                note: payload.note,
            };
            const response = await axiosPrivateInstance.post("/transaction/create", body)
            if (response.data.status === HttpStatus.CREATED) {
                return successToast(response.data.message);
            }
        } catch (err: any) {
            return errorToast(err.response.data.message || err.response.data.error)
        }
    }, [errorToast, successToast, currentTabParam])

    const createScheduleTransaction = useCallback(async (payload: ScheduleTransactionType) => {
        try {
            const body = {
                data: {
                    categoryId: payload.categoryId,
                    amount: sanitizeMoney(payload.amount),
                    type: payload.type,
                    note: payload.note
                },
                transactionName: payload.transactionName,
                frequency: payload.frequency,
                startDate: payload.startDate,
                endDate: payload.endDate,
                dayOfWeek: Number(payload.dayOfWeek),
                dayOfMonth: Number(payload.dayOfMonth)
            };
            const response = await axiosPrivateInstance.post("/transaction/schedule", body);
            if (response.data.status === HttpStatus.CREATED) {
                return successToast(response.data.message);
            }
        } catch (err: any) {
            return errorToast(err.response.data.message || err.response.data.error);
        }
    }, [errorToast, successToast])

    useEffect(() => {
        fetchTransactions({ tab: currentTabParam, month: currentMonthParam });
    }, [currentTabParam, currentMonthParam]);

    return {
        transactions,
        isFetching,
        createTransaction,
        createScheduleTransaction,
    }
}