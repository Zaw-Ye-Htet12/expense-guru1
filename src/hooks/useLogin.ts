import { HttpStatus } from "@/enums/httpStatus";
import axiosInstance from "@/lib/axios";
import useAxiosPrivate from "./useAxiosPrivate";
import { SignInType } from "@/validations/sign-in";
import { useContext, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import { getRelevantRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/context/AuthContext";
import { Sign } from "crypto";
import { EditUser } from "@/types/user";
import { useLogout } from "./useLogout";

export interface User {
  id?: string,
  username: string;
  email: string;
}

export function useLogin() {
  const  axiosPrivateInstance  = useAxiosPrivate();
  const { authUser, setAuthUser, setAccessToken } = useContext(AuthContext);
  const { errorToast,successToast } = useToastHook();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const { logout } = useLogout();

  const setLoggedInUserData = async () => {
    try {
      const {
        data: { data },
      } = await axiosPrivateInstance.get("/auth/me");
      const userData = {
        id: data.id,
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

  const removeLoggedInUserData = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
  }

  const login = async (user: SignInType) => {
    try {
      setLoading(true);
      const { status, data } = await axiosInstance.post("/users/login", user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (status === HttpStatus.CREATED) {
        setAccessToken(data.accessToken);
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

  const update = async (user: Omit<EditUser, "confirmPassword">) => {
    try {
      const { status,data } = await axiosInstance.put("/users/edit", user);
      if (status === HttpStatus.CREATED) {
        if (data.passwordChanged) {
          await logout();
        } else {
          const userData = JSON.parse(localStorage.getItem("userData") || "{}");
          userData.username = user.username;
          userData.email = user.email;
          localStorage.setItem("userData", JSON.stringify(userData));
          setAuthUser(userData);
          setIsLoggedIn(true)
          successToast("Profile updated successfully");
        }
      }
    } catch (error: any) {
      return errorToast(
        error.response.data.message || error.response.data.error
      );
    }
  }

  const checkPassword = async (password: string, id: string) => {
    try {
      const {data} =await axiosInstance.post('/users/checkPassword', { password, id });
      return data.success;
    } catch (error: any) {
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
    update,
    checkPassword,
    getLoggedInUserData,
    removeLoggedInUserData,
    setLoggedInUserData,
    authUser,
    isLoggedIn,
    loading,
  };
}
