import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthOptions } from "@/constants/month";

interface MonthSelectBoxProps {
  selectedMonth: string;
  onChangeMonth: (value: string) => void;
}

const MonthSelectBox = ({
  selectedMonth,
  onChangeMonth,
}: MonthSelectBoxProps) => {
  return (
    <Select onValueChange={onChangeMonth} value={selectedMonth}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select"/>
      </SelectTrigger>
      <SelectContent className="h-[200px]">
        <SelectGroup>
          <SelectLabel>Months</SelectLabel>
          {monthOptions.map((month) => (
            <SelectItem key={month._id} value={month._id}>
              {month.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MonthSelectBox;
