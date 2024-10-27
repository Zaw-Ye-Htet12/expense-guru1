'use client'
import React, { useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLogin, User } from "@/hooks/useLogin";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User>({ username: "", email: "" });
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const { getLoggedInUserData, isLoggedIn } = useLogin();

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
  }
  
  const memoValue = useMemo(
    () => ({
      isLoggedIn,
      authUser,
      setAuthUser,
      accessToken,
      setAccessToken
    }),
    [isLoggedIn, authUser, accessToken]
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
