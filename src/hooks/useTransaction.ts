import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import axiosInstance from "@/lib/axios";
import { Transaction } from "@/types/transaction";

export const useTransaction = () => {
    const { successToast, errorToast } = useToastHook();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/transaction");
            setTransactions(response.data.data);
        } catch (error: any) {
            return errorToast(error.response.data.message || error.response.data.error)
        }
    }, [errorToast])

    useEffect(() => {
        fetchTransactions();
    }, []);

    return {
        transactions
    }
}