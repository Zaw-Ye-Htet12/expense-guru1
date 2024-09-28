import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getMobileRoute } from "@/lib/route"
import { Route } from "@/enums/route"
import Image from "next/image"
import AddIcon from "../../../../../public/footerIcon/add-icon.svg";


export default function Add(){
    return (
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
    )
}