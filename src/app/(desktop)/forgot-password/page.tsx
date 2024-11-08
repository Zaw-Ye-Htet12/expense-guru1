"use client"
import { RecoverPasswordForm } from "@/components/common/recoverPasswordForm";
import AuthLayout from "@/components/desktop/layout/AuthLayout";
import Lottie from "lottie-react";
import LoginImage from "@/lotties/desktop_login_image.json";
import LoginForm from "@/components/common/loginForm";


export default function ForgotPassword(){
    return (
        <AuthLayout image={
            <Lottie
              animationData={LoginImage}
              style={{ width: "600px", height: "600px" }}
            />
          }>
            <RecoverPasswordForm className="w-[80%]"/>
        </AuthLayout>
    )
}