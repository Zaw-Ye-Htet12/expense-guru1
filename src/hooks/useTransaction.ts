import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import axiosInstance from "@/lib/axios";
import { Transaction } from "@/types/transaction";
import { TransactionType } from "@/validations/transaction/create";
import { useSearchParams } from "next/navigation";
import { TransactionTab } from "@/enums/transactionTab";
import { HttpStatus } from "@/enums/httpStatus";
import { useTab } from "./useTab";
import { sanitizeMoney } from "@/utils/frontend/money";

export const useTransaction = () => {
    const { successToast, errorToast } = useToastHook();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const { currentTabParam, currentMonthParam } = useTab();

    const fetchTransactions = useCallback(async (params?: {[key: string]: any}) => {
        setIsFetching(true);
        try {
            const response = await axiosInstance.get(`/transaction`, {
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

    const createTransaction = useCallback(async (transaction: TransactionType) => {
        try {
            const body = {
                categoryId: transaction.categoryId,
                amount: sanitizeMoney(transaction.amount),
                type: transaction.type,
                note: transaction.note,
            };
            const response = await axiosInstance.post("/transaction/create", body)
            if (response.data.status === HttpStatus.CREATED) {
                return successToast(response.data.message);
            }
        } catch (err: any) {
            return errorToast(err.response.data.message || err.response.data.error)
        }
    }, [errorToast, successToast, currentTabParam])

    useEffect(() => {
        fetchTransactions({tab: currentTabParam, month: currentMonthParam}); 
    }, [currentTabParam, currentMonthParam]);

    return {
        transactions,
        isFetching,
        createTransaction
    }
}