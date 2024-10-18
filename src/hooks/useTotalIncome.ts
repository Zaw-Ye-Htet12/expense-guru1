import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import axiosInstance from "@/lib/axios";

export const useTotalIncome = () => {
    const { errorToast } = useToastHook();
    const [totalIncome, setTotalIncome] = useState(0);
    const [isFetching,setIsFetching] = useState(true)
    const fetchTotalIncome = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/transaction/total/income");
            setTotalIncome(response.data.data.income)
        } catch (error: any) {
            return errorToast(
                error.response.message || error.response.data.error
            )
        }finally{
            setIsFetching(false)
        }
    }, [errorToast])
    useEffect(() => {
        fetchTotalIncome();
    }, [])
    return { totalIncome ,isFetching};
}