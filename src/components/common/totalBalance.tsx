"use client";
import { useWallet } from "@/hooks/useWallet";
import CountUp from "react-countup";
import { Skeleton } from "../ui/skeleton";

const TotalBalance = ({ className }: { className?: string }) => {
  const { totalBalance,isFetching } = useWallet();
  return (
    <div>
      {isFetching ? ( <h2 className={`font-bold text-3xl ${className}`}>
        <Skeleton className="w-60 h-[28px] mb-3 bg-slate-200 md:h-[48px]" />
    </h2>) : ( <h2 className={`font-bold text-3xl ${className}`}>
      <CountUp end={totalBalance} duration={1.4} redraw={false} /> MMK
    </h2>)}
    </div>
  );  
};

export default TotalBalance;
