import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import axiosInstance from "@/lib/axios";

export const useTotalExpense = () => {
    const { errorToast } = useToastHook();
    const [totalExpense, setTotalExpense] = useState(0);
    const fetchTotalExpense = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/transaction/total/expense");
            setTotalExpense(response.data.data.expense)
        } catch (error: any) {
            return errorToast(
                error.response.message || error.response.data.error
            )
        }
    }, [errorToast])
    useEffect(() => {
        fetchTotalExpense();
    }, [])
    return { totalExpense };
}