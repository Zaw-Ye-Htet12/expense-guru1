"use client"
import { RecoverPasswordForm } from "@/components/common/recoverPasswordForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BG from "../../../../public/welcome-bg.png";

export default function ForgotPasswordPage(){
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
                    <CardTitle>Recover Password</CardTitle>
                </CardHeader>
                <RecoverPasswordForm />
            </Card>
        </div>
    )
}