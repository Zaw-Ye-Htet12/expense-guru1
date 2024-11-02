"use client";
import { useLogin } from "@/hooks/useLogin";
import { editUserValidationSchema } from "@/validations/signup";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormField } from "./formField";
import { Input } from "../ui/input";
import Link from "next/link";
import { Route } from "@/enums/route";
import { getRelevantRoute } from "@/lib/route";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ProfileEditForm = () => {
  const { back } = useRouter();
  const { authUser, update, checkPassword } = useLogin();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState({
    id: authUser.id,
    username: authUser.username,
    email: authUser.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmit = async (user: any) => {
    if (isChangePassword) {
      const isPasswordCorrect = await checkPassword(
        user.currentPassword,
        authUser.id
      );
      if (!isPasswordCorrect) {
        setPasswordError("Incorrect password. Please try again.");
        return;
      }
      setPasswordError(null);
    }
    await update({
      id: authUser.id,
      username: user.username,
      email: user.email,
      password: isChangePassword ? user.newPassword : "",
    });
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={toFormikValidationSchema(
        editUserValidationSchema(isChangePassword)
      )}
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
            disabled
            defaultValue={initialValue.email}
          />
        </div>
        {!isChangePassword && (
          <div className="px-4 mt-4">
            <span
              className="text-primary cursor-pointer"
              onClick={() => setIsChangePassword(true)}
            >
              Change passoword?
            </span>
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
              {passwordError && (
                <div className="text-red-500 text-sm">{passwordError}</div>
              )}
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
          <Button className=" bg-destructive" type="button" onClick={()=>back()}>Cancel</Button>
          <Button className="" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default ProfileEditForm;
