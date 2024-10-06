import axiosInstance from "@/lib/axios";
import { useToastHook } from "./useToastHook"
import { useCallback, useState } from "react";

interface Category {
    name: string
}

interface Transaction {
    _id: string;
    type: string;
    amount: number;
    categoryId: Category;
    createdAt: string;
    updatedAt: string;
}

export const useTransactionDetail = () => {
    const { successToast, errorToast } = useToastHook();
    const [transaction, setTransaction] = useState<Transaction>(
        {
            _id: "",
            type: "",
            amount: 0,
            categoryId: {
                name: ""
            },
            createdAt: "",
            updatedAt: ""
        }
    );
    const [isFetching, setIsFetching] = useState(true);
    const fetchTransactionDetail = useCallback(async (id: string) => {
        try {
            const response = await axiosInstance.get(`/transaction/${id}`)
            setTransaction(response.data.data)
        } catch (err: any) {
            return errorToast(err.response.data.message || err.response.data.error)
        } finally {
            setIsFetching(false);
        }
    }, [errorToast])
    return {
        fetchTransactionDetail,
        transaction,
        isFetching
    }
}