import { HttpStatus } from "@/enums/httpStatus";
import axiosInstance from "@/lib/axios";
import { SignInType } from "@/validations/sign-in";
import { useContext, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import { getRelevantRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/context/AuthContext";
import { Sign } from "crypto";

export interface User {
  username: string;
  email: string;
}

export function useLogin() {
  const { errorToast } = useToastHook();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const { authUser, setAuthUser } = useContext(AuthContext);

  const setLoggedInUserData = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get("users/auth/me");
      const userData = {
        username: data.username,
        email: data.email,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      setAuthUser(userData);
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getLoggedInUserData = () => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        setIsLoggedIn(true);
        return JSON.parse(userData);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const login = async (user: SignInType) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post("/users/login", user);
      if (status === HttpStatus.CREATED) {
        await setLoggedInUserData();
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      setLoading(false);
      return errorToast(
        error.response.data.message || error.response.data.error
      );
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      router.push(getRelevantRoute(Route.HOME));
      router.refresh();
    }
  }, [isLoggedIn]);

  return {
    login,
    getLoggedInUserData,
    authUser,
    isLoggedIn,
    loading,
  };
}
