import { RecoverPasswordForm } from "@/components/common/recoverPasswordForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BG from "../../../../public/welcome-bg.png";
import ResetPassworForm from "@/components/common/resetPasswordForm";
import WithSuspense from "@/components/common/withSuspense";

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string } }) {
    const token = searchParams.token || null
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
                <WithSuspense>
                    <ResetPassworForm token={token}/>
                </WithSuspense>
            </Card>
        </div>
    )
}