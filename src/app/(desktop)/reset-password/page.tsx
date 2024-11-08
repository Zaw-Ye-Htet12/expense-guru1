"use client"
import ResetPassworForm from "@/components/common/resetPasswordForm";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage(){
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || null;

    return (
        <div className="flex h-dvh w-screen items-center justify-center">
            <ResetPassworForm id={id}/>
        </div>
    )
}