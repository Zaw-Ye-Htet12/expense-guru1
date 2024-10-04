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
    const [isFetching, setIsFetching] = useState(true);
    const { currentParam } = useTab();

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/transaction");
            setTransactions(response.data.data);
        } catch (error: any) {
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
                type: currentParam.toLowerCase(),
            };
            const response = await axiosInstance.post("/transaction/create", body)
            if (response.data.status === HttpStatus.CREATED) {
                return successToast(response.data.message);
            }
        } catch (err: any) {
            return errorToast(err.response.data.message || err.response.data.error)
        }
    }, [errorToast, successToast, currentParam])

    useEffect(() => {
        fetchTransactions();
    }, []);

    return {
        transactions,
        isFetching,
        createTransaction
    }
}