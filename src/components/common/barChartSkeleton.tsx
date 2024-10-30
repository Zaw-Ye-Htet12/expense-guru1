import { cn } from "@/lib/utils"

function BarChartSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse flex justify-center items-end w-full h-full gap-5",
        className
      )}
      {...props}
    >
      <div className="w-6 h-[40%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[60%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[30%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[70%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[50%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[80%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[40%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[60%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[30%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[70%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[50%] bg-slate-200 rounded-md"></div>
      <div className="w-6 h-[80%] bg-slate-200 rounded-md"></div>
      
    </div>
  )
}

export { BarChartSkeleton }
