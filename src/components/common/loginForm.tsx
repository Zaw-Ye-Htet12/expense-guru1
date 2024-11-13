"use client";
import { FormField } from "@/components/common/formField";
import { Loading } from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Route } from "@/enums/route";
import { useLogin } from "@/hooks/useLogin";
import { SignInType, signInValidation } from "@/validations/sign-in";
import { Form, Formik } from "formik";
import Link from "next/link";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { getRelevantRoute } from "@/lib/route";
import GoogleLogo from '../../../public/google.svg';
import GithubLogo from '../../../public/github.svg'
import Image from "next/image";



const LoginForm = ({ className = "w-full" }: { className?: string }) => {
  const { login, loading } = useLogin();

  const handleSubmit = async (user: SignInType) => {
    await login(user);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={toFormikValidationSchema(signInValidation)}
        onSubmit={handleSubmit}
      >
        <Form className={className}>
          <CardContent>
            <div className="space-y-3.5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <FormField
                  as={Input}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <FormField
                  name="password"
                  type="password"
                  as={Input}
                  id="password"
                />
              </div>
              <Button
                className="w-full"
                type="submit"
                variant="gooeyLeft"
                disabled={loading}
              >
                {loading ? <Loading /> : "Login"}
              </Button>
              <div className="flex w-full justify-center items-center">Or</div>
              <Button
                className="w-full bg-white text-[#51A7A1] border"
                variant="ghost"
                type="button"
                onClick={() => {
                  window.location.href =
                    "http://localhost:8000/api/v1/auth/google";
                }}
              >
                <div className="rounded">
                  <Image src={GoogleLogo} alt="google_logo" className="w-7 h-7 mr-2 bg-transparent" />
                </div><span>Continue with Google</span>
              </Button>
              <Button
                className="w-full bg-white text-[#51A7A1] border"
                variant="ghost"
                type="button"
                onClick={() => {
                  window.location.href =
                    "http://localhost:8000/api/v1/auth/github";
                }}
              >
                <div className="rounded">
                  <Image src={GithubLogo} alt="google_logo" className="w-7 h-7 mr-2 bg-transparent" />
                </div><span>Continue with Github</span>
              </Button>
              <Label className="text-center w-full flex justify-center">
                Do not have an account?
                <Link
                  href={getRelevantRoute(Route.SIGNUP)}
                  className="text-primary ml-2"
                >
                  Signup
                </Link>
              </Label>
            </div>
          </CardContent>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
