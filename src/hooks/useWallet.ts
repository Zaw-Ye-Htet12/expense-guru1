import { useState,useEffect } from "react";
import { useToastHook } from "./useToastHook";
import axiosInstance from "@/lib/axios";

export const useWallet=()=>{
    const {errorToast} = useToastHook();
    const [totalBalance,setTotalBalance] = useState(0);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const getBalance = async()=>{
        try{
            const response = await axiosInstance.get("/wallet/balance");
            setTotalBalance(response.data.data.totalBalance)
        }catch(error:any){
            return errorToast(
                error.response.message || error.response.data.error
            )
        }
        finally{
            setIsFetching(false)
        }
    }
    useEffect(()=>{
        getBalance();
    },[])
    return {totalBalance,isFetching};
}