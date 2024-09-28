"use client"

import Image from "next/image"
import WithSuspense from "@/components/common/withSuspense"
import Bg from "../../../../../public/home-bg.png"
import CategoryList from "@/components/mobile/category/categoryList"

export default function Category() {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
                <Image src={Bg} alt="background" className="w-screen" priority />
                <WithSuspense>
                    <CategoryList />
                </WithSuspense>
            </div>
        </div>
    )
}