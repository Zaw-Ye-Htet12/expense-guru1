"use client"
import { Form, Formik } from "formik";
import { useState } from "react";
import { FormField } from "./formField";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { emailValidation, EmailVerifyType } from "@/validations/sign-in";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useLogin } from "@/hooks/useLogin";

export function RecoverPasswordForm({className = "w-full"}:{className?:string}){
    const {sendPasswordRecoveryEmail} = useLogin();
    const [initialValue,setInitialValue] = useState({
        email:""
    })
    const handleSubmit=async(email:any)=>{
        await sendPasswordRecoveryEmail(email);
    }
    return (
        <>
            <div className="flex w-full justify-center text-4xl font-bold mb-8">Recover Password</div>
            <Formik 
                initialValues={initialValue}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(emailValidation)}
            >
                <Form className={className}>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <FormField 
                            as={Input}
                            name="email"
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                        />
                    </div>
                    <Button type="submit" className="w-full mt-3" variant="gooeyLeft">Send reset password email</Button>
                </Form>
            </Formik>
        </>
    )
}