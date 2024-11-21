import ResetPassworForm from "@/components/common/resetPasswordForm";
import WithSuspense from "@/components/common/withSuspense";
import React from "react";

export default function ResetPasswordPage({searchParams}: {searchParams: {token?: string}}){
    const token = searchParams.token || null;
    return (
        <div className="flex flex-col h-dvh w-screen items-center justify-center">
            <span className="text-4xl text-center text-primary font-extrabold">Reset Password</span>
            <WithSuspense>
                <ResetPassworForm token={token} className="w-[50%]"/>
            </WithSuspense>
        </div>
    )
}