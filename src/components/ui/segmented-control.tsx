"use client";
import { useTab } from "@/hooks/useTab";
import React, { useEffect, useState } from "react";

interface Props {
  data: string[];
  defaultTab: string;
  onSelectionChange: (item: string) => void;
}

export default function SegmentedControl({
  data,
  defaultTab,
  onSelectionChange,
}: Props) {
  const { handleTabChange } = useTab();
  const [selected, setSelected] = useState(defaultTab);
  const handleOnClick = (item: string) => {
    setSelected(item);
    onSelectionChange(item);
  };

  useEffect(() => {
    handleTabChange(selected);
  }, [selected]);

  return (
    <div className="py-4 w-full font-semibold">
      <div className="inline-flex w-full rounded-full bg-gray-200">
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
