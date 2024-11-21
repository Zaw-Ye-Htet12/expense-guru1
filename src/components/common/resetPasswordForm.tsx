'use client'
import { Form, Formik } from "formik";
import { FormField } from "./formField";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { resetPasswordType, resetPasswordValidation } from "@/validations/signup";
import { useLogin } from "@/hooks/useLogin";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";

export default function ResetPassworForm({ token, className = "w-full" }: { token: string | null, className?: string }) {
    const { resetPassword } = useLogin();
    const handleSubmit = async (user: resetPasswordType) => {
        await resetPassword(token, user);
    }
    return (
        <div className={`${className}`}>
            <Formik
                initialValues={{
                    password: "",
                    confirmPassword: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(resetPasswordValidation)}
            >
                <Form className="w-full">
                    <CardContent>
                        <div className="mb-2 mt-4 space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <FormField
                                as={Input}
                                name="password"
                                type="password"
                                id="password"
                                placeholder="new password"
                                required
                            />
                        </div>
                        <div className="mb-2 space-y-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <FormField
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                                type="password"
                                placeholder="confirm password"
                                as={Input}
                            />
                        </div>
                        <Button className="w-full" type="submit" variant="gooeyLeft">Change Password</Button>
                    </CardContent>
                </Form>
            </Formik>
        </div>
    )
}