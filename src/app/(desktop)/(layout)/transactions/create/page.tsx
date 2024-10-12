import { TransactionForm } from "@/app/mobile/(layout)/add/page"
import Link from "next/link"

export default function CreatePage(){
    return (
        <div className="h-full -z-10">
        <div className="w-full h-32 relative">
            <div className="z-50 absolute p-5 w-full">
                <h1 className="text-2xl font-semibold mb-5">
                    <Link href="/transactions" className="text-gray-400">Transactions </Link>
                    <span className="text-primaryLight">/ Create</span>
                </h1>
                <TransactionForm/>
            </div>
        </div>
    </div>
    )
}