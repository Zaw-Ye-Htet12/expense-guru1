import { PieChartDonut } from "@/components/common/piechart";
import WithSuspense from "@/components/common/withSuspense";
import Image from "next/image";
import React from "react";
import Bg from "../../../../../public/home-bg.png";
import SegmentedControl from "@/components/ui/segmented-control";
import StatisticCharts from "@/components/common/statisticCharts";

const StatisticPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex-1 flex flex-col items-center">
        <Image src={Bg} alt="background" className="w-screen" />
          <div className="bg-slate-200 w-screen h-[90%] rounded-t-[35px] absolute bottom-0">
            <StatisticCharts />
          </div>
      </div>
    </div>
  );
};

export default StatisticPage;
