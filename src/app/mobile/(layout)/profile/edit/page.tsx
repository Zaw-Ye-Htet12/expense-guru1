import Image from "next/image";
import Bg from "../../../../../../public/home-bg.png";
import React from "react";
import ProfileHeader from "@/components/common/profileHeader";
import Avatar from "@/components/common/avatar";
import ProfileEditForm from "@/components/common/profileEditForm";

const EditPage = () => {
  return (
    <div className="pt-10 flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0 right-0">
        <Image src={Bg} alt="background image" />
        <div className="relative bottom-[80px]">
          <div className="flex flex-col items-center w-screen">
            <Avatar />
          </div>
          <div className="px-3">
            <ProfileEditForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
