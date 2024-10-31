import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

function BarChartSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div
      className={cn(
        "animate-pulse flex justify-center items-end w-full md:h-[390px] h-[200px] md:gap-5 gap-3",
        className
      )}
      {...props}
    >
      <div className="md:w-6 w-2 h-[40%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[60%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[30%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[70%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[50%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[80%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[40%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[60%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[30%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[70%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[50%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[80%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[30%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[70%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[50%] bg-slate-200 rounded-md"></div>
      <div className="md:w-6 w-2 h-[80%] bg-slate-200 rounded-md"></div>
      
    </div>
    <div className="flex justify-center gap-3 mt-4">
        <Skeleton className="h-4 w-14 bg-slate-200"/>
        <Skeleton className="h-4 w-14 bg-slate-200"/>
    </div>
    </>
  )
}

export { BarChartSkeleton }
