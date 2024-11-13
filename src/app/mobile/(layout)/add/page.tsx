import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import WithSuspense from "@/components/common/withSuspense";
import { TransactionForm } from "@/components/common/transactionForm";

export default function Add() {
  return (
    <div className="pt-10 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 h-dvh">
        <Image src={Bg} alt="background image" className="w-screen" />
        <div className="relative bottom-[150px] w-[90%] py-5 px-3 mx-auto shadow-md rounded-3xl bg-white">
          <WithSuspense>
            <TransactionForm />
          </WithSuspense>
        </div>
      </div>
    </div>
  );
}

