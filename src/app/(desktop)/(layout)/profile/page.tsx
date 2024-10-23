"use client"
import ProfileHeader from "@/components/common/profileHeader";
import { Route } from "@/enums/route";
import { getRelevantRoute } from "@/lib/route";
import { ExitIcon, StackIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import Bg from "../../../../../public/home-bg.png"
import { useLogout } from "@/hooks/useLogout";
import { useLogin } from "@/hooks/useLogin";
import { EditIcon } from "lucide-react";

export default function ProfilePage(){
    const { logout } = useLogout();
    const {authUser} =  useLogin();
    const handleLogout = async() => {
        await logout();
    }
    return (
        <div className="pt-10 flex flex-col justify-center items-center">
          <div className="absolute top-0 left-0 right-0">
            <Image src={Bg} alt="background image" className="w-screen h-28"/>
            <div className="relative bottom-[80px]">
              <ProfileHeader />
              <div className="flex flex-col gap-10 pt-10">
                <Link href={`${getRelevantRoute(Route.PROFILE)}/${authUser.id}`}
                  className="flex flex-row w-full px-6 items-center">
                  <EditIcon width={30} height={20}/>
                  <div className="ms-4">Edit Profile</div>
                </Link>
                <Link
                  href={getRelevantRoute(Route.CATEGORY)}
                  className="flex flex-row w-full px-6 items-center"
                >
                  <StackIcon width={30} />
                  <div className="ms-4">Category</div>
                </Link>
                <div
                  className="flex flex-row w-full px-6 items-center text-destructive" onClick={handleLogout}
                >
                  <ExitIcon width={30} />
                  <div className="ms-4">Logout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}