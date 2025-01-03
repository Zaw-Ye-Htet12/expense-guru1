
import { useRouter } from "next/navigation";
import { useToastHook } from "./useToastHook"
import { useLogin } from "./useLogin";
import axiosInstance from "@/lib/axios";
import { HttpStatus } from "@/enums/httpStatus";
import { getRelevantRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthContext";

export const useLogout =()=>{
    const {errorToast} =  useToastHook();
    const router = useRouter();
    // const { removeLoggedInUserData } = useLogin();
    const { setAccessToken } = useContext(AuthContext);

    const logout =async()=>{
        try{
            const { status } = await axiosInstance.get("/users/logout", {
                withCredentials: true
            });
            if(status === HttpStatus.CREATED){
                // removeLoggedInUserData();
                localStorage.removeItem("userData")
                setAccessToken(null);
                router.push(getRelevantRoute(Route.LOGIN))
            }
        }catch(error:any){
            return errorToast(
                error.response.data.message || error.response.data.error
              );
        }
    }
    return {logout}
}