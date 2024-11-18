"use client"
import { RecoverPasswordForm } from "@/components/common/recoverPasswordForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BG from "../../../../public/welcome-bg.png";
import ResetPassworForm from "@/components/common/resetPasswordForm";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage(){
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || null;

    return (
        <div className="h-dvh flex flex-col justify-center items-center"
        style={{
            backgroundImage: `url(${BG.src})`,
            backgroundPosition: "top center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
            <Card className="w-[80%]">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <ResetPassworForm token={token}/>
            </Card>
        </div>
    )
}