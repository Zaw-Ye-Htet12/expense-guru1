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

export default function ProfilePage() {
  const { logout } = useLogout();
  const { authUser } = useLogin();
  const handleLogout = async () => {
    await logout();
  }
  return (
    <div className="absolute top-0 left-0 right-0">
      <div className="bg-[#3C8F8A] py-10 ">
        <ProfileHeader className="relative"/>
      </div>
      <div className="flex flex-col gap-10 pt-10">
        <Link href={`${getRelevantRoute(Route.PROFILE)}/edit`}
          className="flex flex-row w-full px-6 items-center ms-2">
          <EditIcon width={15} height={20} />
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

      );
}