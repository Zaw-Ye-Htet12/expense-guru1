"use client";
import React, { useState } from "react";

interface Props {
  data: string[];
  currentTab: string;
  onSelectionChange: (item: string) => void;
}

export default function SegmentedControl({
  data,
  currentTab,
  onSelectionChange,
}: Props) {
  const [selected, setSelected] = useState(currentTab || data[0]);
  const handleOnClick = (item: string) => {
    setSelected(item);
    onSelectionChange(item);
  };

  return (
    <div className="py-4 w-full font-semibold">
      <div className="inline-flex w-full rounded-full bg-gray-100">
        {data.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full w-full transition-all duration-300 ${
              selected === item ? "bg-white shadow" : ""
            }`}
            onClick={() => handleOnClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
