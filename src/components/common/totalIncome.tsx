import { useTotalIncome } from "@/hooks/useTotalIncome";
import CountUp from "react-countup";
import { Skeleton } from "../ui/skeleton";

export const TotalIncome = ({ className }: { className?: string }) => {
  const { totalIncome, isFetching } = useTotalIncome();
  return (
    <div>
      {isFetching ? (<h2>
        <Skeleton className="w-60 h-[48px] mb-3 bg-slate-200" />
      </h2>) : (
        <h2 className={`font-bold text-3xl ${className}`}>
          <CountUp className={className} end={totalIncome} /> MMK
        </h2>
      )}
    </div>
  );
};
