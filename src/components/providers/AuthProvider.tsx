'use client'
import React, { useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLogin, User } from "@/hooks/useLogin";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User>({id:"",username: "", email: ""});
  const { getLoggedInUserData, isLoggedIn } = useLogin();
  const memoValue = useMemo(
    () => ({
      isLoggedIn,
      authUser,
      setAuthUser,
    }),
    [isLoggedIn, authUser]
  );

  useEffect(() => {
    const data = getLoggedInUserData();
    if (data) {
      setAuthUser(data);
    }
  }, []);
  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
