'use client'
import React from "react";
import { useLogin } from "@/hooks/useLogin";

const Page = () => {
  const { authUser } = useLogin();
  return (
    <>
      <h4>{authUser.username}</h4>
      <div>Desktop home page</div>
    </>
  );
};

export default Page;