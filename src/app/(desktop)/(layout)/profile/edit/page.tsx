"use client"

import ProfileEditForm from "@/components/common/profileEditForm";
import Link from "next/link";

export default function ProfileEditPage() {
    return (
        <div className="h-full -z-10">
            <div className="w-full h-32 relative">
                <div className="z-50 absolute p-5 w-full">
                    <h1 className="text-2xl font-semibold mb-5">
                        <Link href="/profile" className="text-gray-400">Profile </Link>
                        <span className="text-primaryLight">/ Edit</span>
                    </h1>
                    <ProfileEditForm />
                </div>
            </div>
        </div>
    )
}