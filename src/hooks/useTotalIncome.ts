import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import useAxiosPrivate from "./useAxiosPrivate";

export const useTotalIncome = () => {
    const axiosPrivateInstance = useAxiosPrivate();
    const { errorToast } = useToastHook();
    const [totalIncome, setTotalIncome] = useState(0);
    const [isFetching,setIsFetching] = useState(true)
    const fetchTotalIncome = useCallback(async () => {
        try {
            const response = await axiosPrivateInstance.get("/transaction/total/income");
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