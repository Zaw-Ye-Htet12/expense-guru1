import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SignUpUserType } from "@/validations/signup";
import axiosInstance from "@/lib/axios";
import { HttpStatus } from "@/enums/httpStatus";
import { getRelevantRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import { useToastHook } from "./useToastHook";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { errorToast } = useToastHook();
  const router = useRouter();
  const signup = async (user: Omit<SignUpUserType, "confirmPassword">) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post("/users/register", user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (status === HttpStatus.CREATED) {
        setLoading(false);
        router.push(getRelevantRoute(Route.LOGIN));
      }
    } catch (error: any) {
      setLoading(false);
      return errorToast(error.response.data.message);
    }
  };
  return { signup, loading };
};
