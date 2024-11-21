"use client"
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { getRelevantRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import Landing from "@/components/mobile/landing";
import Lottie from "lottie-react";
import Loading from "@/lotties/loading.json";
import { AuthContext } from "@/components/context/AuthContext";

export default function GoogleAuthCallback() {
  const { setLoggedInUserData } = useLogin();
  const router = useRouter();
  const {authUser,setAuthUser} = useContext(AuthContext);

  useEffect(() => {
    const handleLogin = async () => {
      const data = await setLoggedInUserData();
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData.Oauth = true;
      localStorage.setItem("userData", JSON.stringify(userData));
      setAuthUser(userData);
      if (data) {
        router.push(getRelevantRoute(Route.HOME)); // Redirect to home page after successful login
      } else {
        router.push(getRelevantRoute(Route.LOGIN)); // Redirect to login page if there's an issue
      }
    };

    handleLogin();
  }, [setLoggedInUserData, router]);

  return (
    <div>
      <div className="h-dvh w-full flex flex-col justify-center items-center text-white font-bold text-3xl bg-[#488d88]">
        <Lottie animationData={Loading} className="w-40 h-40" />
        <div className="relative top-[-10px] text-base">Redirecting to Expense Tracker...</div>
      </div>
    </div>
  );
}
