import axiosInstance from "@/lib/axios";
import { useToastHook } from "./useToastHook"
import { useCallback, useEffect, useState } from "react";
import { HttpStatus } from "@/enums/httpStatus";

interface Category {
    name: string
}

interface Transaction {
    _id: string;
    type: string;
    amount: number;
    categoryId: Category;
    note: string,
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
            note: "",
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

    const updateTransaction = useCallback(async (transaction: { note: string, id: string }) => {
        try {
            const response = await axiosInstance.put('/transaction/change-note', transaction)
            const updatedTransaction = response.data.data;

            if (response.data.status === HttpStatus.OK) {
                setTransaction((prevTransaction) => ({
                    ...prevTransaction,
                    note: updatedTransaction.note,
                }));
                return successToast(response.data.message);
            }
        } catch (err: any) {
            return errorToast(err.response?.data?.message || err.response?.data.error?.error?.note || "Something went wrong")
        }
    }, [errorToast, successToast, fetchTransactionDetail])

    return {
        fetchTransactionDetail,
        updateTransaction,
        transaction,
        isFetching
    }
}