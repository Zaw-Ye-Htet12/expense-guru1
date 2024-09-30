import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getMobileRoute } from "@/lib/route"
import { Route } from "@/enums/route"
import Image from "next/image"
import AddIcon from "../../../../../public/footerIcon/add-icon.svg";
import Bg from "../../../../../public/home-bg.png";


export default function Add() {
  return (
    <div className="pt-10 flex flex-col items-center justify-center">
      <div className="absolute top-10 left-10 h-auto">
        <Image src={Bg} alt="background image" className="w-screen" />
        <div className="relative bottom-[100px] w-[90%] py-5 px-3 mx-auto shadow-md rounded-3xl bg-white">
          <span className="flex justify-between items-center">
            <Label htmlFor="category">
              <span>Category</span>
            </Label>
            <Link
              href={getMobileRoute(Route.CATEGORY)}
              className="p-1 rounded-full bg-[#2f7e79] w-[23px]"
            >
              <Image src={AddIcon} alt="add icon" />
            </Link>
          </span>
        </div>
      </div>
    </div>



  )
}