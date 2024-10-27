import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import useAxiosPrivate from "./useAxiosPrivate";

export const useTotalExpense = () => {
    const axiosPrivateInstance = useAxiosPrivate();
    const { errorToast } = useToastHook();
    const [totalExpense, setTotalExpense] = useState(0);
    const [isFetching,setIsFetching] = useState(true)
    const fetchTotalExpense = useCallback(async () => {
        try {
            const response = await axiosPrivateInstance.get("/transaction/total/expense");
            setTotalExpense(response.data.data.expense)
        } catch (error: any) {
            return errorToast(
                error.response.message || error.response.data.error
            )
        }finally{
            setIsFetching(false)
        }
    }, [errorToast])
    useEffect(() => {
        fetchTotalExpense();
    }, [])
    return { totalExpense,isFetching };
}