'use client'
import React from "react";
import Bg from "../../../../../public/home-bg.png";
import Image from "next/image";
import ProfileHeader from "@/components/common/profileHeader";
import Link from "next/link";
import { getRelevantRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import { ExitIcon, StackIcon } from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";
import { EditIcon } from "lucide-react";

const ProfilePage = () => {
  const { logout } = useLogout();
  const handleLogout = async() => {
    await logout();
  }
  return (
    <div className="pt-10 flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0 right-0">
        <Image src={Bg} alt="background image" />
        <div className="relative bottom-[80px]">
          <ProfileHeader />
          <div className="flex flex-col gap-10 pt-10">
            <Link
              href={`${getRelevantRoute(Route.PROFILE)}/edit`}
              className="flex flex-row w-full px-9 items-center"
            >
              <EditIcon width={15}/>
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
};

export default ProfilePage;
