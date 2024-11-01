import { useTotalExpense } from "@/hooks/useTotalExpense";
import React from "react";
import CountUp from "react-countup";
import { Skeleton } from "../ui/skeleton";

const TotalExpense = ({ className }: { className?: string }) => {
  const { totalExpense, isFetching } = useTotalExpense();
  return (
    <div>         
      {isFetching ? (<h2>
        <Skeleton className="w-40 h-[28px] mb-3 bg-slate-200 md:w-60 md:h-[48px]" />
      </h2>
      ) : (
        <h2 className={`font-bold text-3xl ${className}`}>
          <CountUp end={totalExpense} className={className} /> MMK
        </h2>
      )}

    </div>
  );
};

export default TotalExpense;
