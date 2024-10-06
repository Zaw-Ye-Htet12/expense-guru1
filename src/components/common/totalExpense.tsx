import { useTotalExpense } from "@/hooks/useTotalExpense";
import React from "react";
import CountUp from "react-countup";

const TotalExpense = ({ className }: { className?: string }) => {
  const { totalExpense } = useTotalExpense();
  return (
    <h2>
      <CountUp end={totalExpense} className={className} />
    </h2>
  );
};

export default TotalExpense;
