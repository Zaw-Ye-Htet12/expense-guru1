"use client"

import { FormField } from "@/components/common/formField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Route } from "@/enums/route";
import { useLogin } from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";
import { getRelevantRoute } from "@/lib/route";
import { EditUser, User } from "@/types/user";
import {  editUserValidationSchema } from "@/validations/signup";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function ProfileEditPage({ params }: { params: { id: string } }) {
    const { authUser,update,checkPassword } = useLogin();
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false)
    const [initialValue, setInitialValue] = useState({
        id:params.id,
        username: authUser.username,
        email: authUser.email,
        currentPassword: "",
        newPassword:"",
        confirmPassword:""
    })
    const handleSubmit = async (user: any) => {
        if (isChangePassword) {
            const isPasswordCorrect = await checkPassword(user.currentPassword, params.id);
            if (!isPasswordCorrect) {
                setPasswordError("Incorrect password. Please try again.");
                return; 
            }
            setPasswordError(null); 
        }
        await update({
            id:params.id,
            username: user.username,
            email: user.email,
            password: isChangePassword ? user.newPassword : ""
        })
    };
    return (
        <div className="h-full -z-10">
            <div className="w-full h-32 relative">
                <div className="z-50 absolute p-5 w-full">
                    <h1 className="text-2xl font-semibold mb-5">
                        <Link href="/profile" className="text-gray-400">Profile </Link>
                        <span className="text-primaryLight">/ Edit</span>
                    </h1>
                    <Formik initialValues={initialValue}
                        onSubmit={handleSubmit}
                        validationSchema={toFormikValidationSchema(editUserValidationSchema(isChangePassword))}
                    >
                        <Form>
                            <div className="px-4 mt-4 w-full flex flex-col gap-3">
                                <Label htmlFor="username">
                                    <span>Username</span>
                                </Label>
                                <FormField
                                    as={Input}
                                    name="username"
                                    type="text"
                                    id="username"
                                    defaultValue={initialValue.username}
                                />
                            </div>
                            <div className="px-4 mt-4 w-full flex flex-col gap-3">
                                <Label htmlFor="email">
                                    <span>Email</span>
                                </Label>
                                <FormField
                                    as={Input}
                                    name="email"
                                    type="email"
                                    id="email"
                                    defaultValue={initialValue.email}
                                />
                            </div>
                            {!isChangePassword && (
                                <div className="px-4 mt-4">
                                    <span className="text-primary cursor-pointer" onClick={() => setIsChangePassword(true)}>Change passoword?</span>
                                </div>
                            )}
                            {isChangePassword && (
                                <>
                                    <div className="px-4 mt-4 w-full flex flex-col gap-3">
                                        <Label htmlFor="currentPassword">
                                            <span>Current Password</span>
                                        </Label>
                                        <FormField
                                            as={Input}
                                            name="currentPassword"
                                            type="text"
                                            id="currentPassword"
                                        />
                                        {passwordError && <div className="text-red-500">{passwordError}</div>}
                                    </div>

                                    <div className="px-4 mt-4 w-full flex flex-col gap-3">
                                        <Label htmlFor="newPassword">
                                            <span>New Password</span>
                                        </Label>
                                        <FormField
                                            as={Input}
                                            name="newPassword"
                                            type="password"
                                            id="newPassword"
                                        />
                                    </div>
                                    <div className="px-4 mt-4 w-full flex flex-col gap-3">
                                        <Label htmlFor="confirmPassword">
                                            <span>Confirm Password</span>
                                        </Label>
                                        <FormField
                                            as={Input}
                                            name="confirmPassword"
                                            type="password"
                                            id="confirmPassword"
                                        />
                                    </div>
                                </>
                            )}

                            <div className=" px-4 mt-4 flex  gap-3 justify-end">
                                <Link href={getRelevantRoute(Route.HOME)}>
                                    <Button className=" bg-destructive">Cancel</Button>
                                </Link>
                                <Button className="w-[10%]" type="submit">Save</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}