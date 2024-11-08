import { Form, Formik } from "formik";
import { FormField } from "./formField";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { resetPasswordType, resetPasswordValidation } from "@/validations/signup";
import { useLogin } from "@/hooks/useLogin";

export default function ResetPassworForm({id}:{id:string | null}) {
    const {resetPassword} = useLogin();
    const handleSubmit = async(user:resetPasswordType)=>{
        await resetPassword(id,user);
    }
    return (
        <div className="flex flex-col  w-[30%]">
            <span className="text-4xl text-center text-primary font-extrabold">Reset Password</span>
            <Formik 
                initialValues={{
                    password:"",
                    confirmPassword:""
                }}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(resetPasswordValidation)}
            >
                <Form>
                    <div className="mb-2 mt-4 space-y-2">
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
                </Form>
            </Formik>
        </div>
    )
}