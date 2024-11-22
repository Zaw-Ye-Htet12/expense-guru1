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
import { resetPasswordType } from "@/validations/signup";

export interface User {
  id?: string,
  username: string;
  email: string;
  Oauth?:boolean
}

export function useLogin() {
  const { errorToast, successToast } = useToastHook();
  const { logout } = useLogout();
  const axiosPrivateInstance = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const { authUser, setAuthUser, setAccessToken } = useContext(AuthContext);

  const setLoggedInUserData = async () => {
    try {
      const {
        data: { data },
      } = await axiosPrivateInstance.get("/auth/me");
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        Oauth:false
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
        setLoading(false);
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
      const { status, data } = await axiosInstance.put("/users/edit", user);
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

  const checkPassword = async (password: string, id: string | undefined) => {
    try {
      const { data } = await axiosInstance.post('/users/checkPassword', { password, id });
      return data.success;
    } catch (error: any) {
      return errorToast(
        error.response.data.message || error.response.data.error
      );
    }
  };
  const sendPasswordRecoveryEmail = async (email: string) => {
    try {
      const { data, status } = await axiosPrivateInstance.post("/users/recover-password", email);
      if (status === HttpStatus.CREATED) {
        router.push(getRelevantRoute(Route.LOGIN));
        successToast(data.message);
      }
    } catch (error: any) {
      return errorToast(
        error.response.data.message || error.response.data.error
      );
    }
  };

  const resetPassword = async (token: string | null, user: Omit<resetPasswordType, "confirmPassword">) => {
    try {
      const { status, data } = await axiosPrivateInstance.put("/users/reset-password", { token, user });
      if (status === HttpStatus.CREATED) {
        router.push(getRelevantRoute(Route.LOGIN));
        successToast(data.message)
      }
    } catch (error: any) {
      return errorToast(
        error.response.data.message || error.response.data.error
      );
    }
  }
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      router.push(getRelevantRoute(Route.HOME));
      router.refresh();
      console.log("redirected to the home page after authenticating....")
    }
  }, [isLoggedIn]);

  return {
    login,
    update,
    checkPassword,
    getLoggedInUserData,
    removeLoggedInUserData,
    setLoggedInUserData,
    sendPasswordRecoveryEmail,
    resetPassword,
    authUser,
    isLoggedIn,
    loading,
  };
}
