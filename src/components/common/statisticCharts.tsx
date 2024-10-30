"use client";
import React, { useState } from "react";
import { PieChartDonut } from "./piechart";
import { BarChartComponent } from "./barchart";
import { ChartSelectionTab } from "@/enums/chartSelectionTab";

const StatisticCharts = () => {
  const [selectedChart, setSelectedChart] = useState(ChartSelectionTab.CATEGORY);

  return (
    <div className="container w-full h-full max-h-[80%] px-4 pt-[15%] flex flex-col items-center">
      {/* Segmented Control */}
      <div className="inline-flex w-[90%] justify-center mb-4 bg-gray-300 rounded-full font-semibold">
        <button
          onClick={() => setSelectedChart(ChartSelectionTab.TRANSACTION)}
          className={`px-4 py-2 rounded-full w-full transition-all duration-300 ${
            selectedChart === "Transaction" ? "bg-white shadow" : ""
          }`}
        >
          Transaction
        </button>
        <button
          onClick={() => setSelectedChart(ChartSelectionTab.CATEGORY)}
          className={`px-4 py-2 rounded-full w-full transition-all duration-300 ${
            selectedChart === "Category" ? "bg-white shadow" : ""
          }`}
        >
          Category
        </button>
      </div>

      {/* Conditional Rendering of Charts */}
      <div className="w-full h-full flex items-center justify-center">
        {selectedChart === "Transaction" ? (
          <BarChartComponent className="w-full min-w-[90%]" />
        ) : (
          <PieChartDonut />
        )}
      </div>
    </div>
  );
};

export default StatisticCharts;
