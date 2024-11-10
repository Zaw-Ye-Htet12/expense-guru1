"use client"
import ResetPassworForm from "@/components/common/resetPasswordForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage(){
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || null;
    return (
        <div className="flex flex-col h-dvh w-screen items-center justify-center">
            <span className="text-4xl text-center text-primary font-extrabold">Reset Password</span>
            <ResetPassworForm token={token} className="w-[50%]"/>
        </div>
    )
}