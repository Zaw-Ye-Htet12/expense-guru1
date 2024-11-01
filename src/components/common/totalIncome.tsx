import { useTotalIncome } from "@/hooks/useTotalIncome";
import CountUp from "react-countup";
import { Skeleton } from "../ui/skeleton";

export const TotalIncome = ({ className }: { className?: string }) => {
  const { totalIncome, isFetching } = useTotalIncome();
  return (
    <div>
      {isFetching ? (<h2>
        <Skeleton className="w-40 h-[28px] mb-3 bg-slate-200 md:w-60 md:h-[48px]" />
      </h2>) : (
        <h2 className={`font-bold text-3xl ${className}`}>
          <CountUp className={className} end={totalIncome} /> MMK
        </h2>
      )}
    </div>
  );
};
