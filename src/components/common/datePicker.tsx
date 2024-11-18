// DatePicker.tsx
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useField, useFormikContext } from "formik";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  name: string;
}

export function DatePicker({ name }: DatePickerProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const [date, setDate] = React.useState<Date | null>(field.value || null);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate ?? null);
    setFieldValue(name, selectedDate ?? null); // Update Formik field value
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          fromDate={new Date()}
          mode="single"
          selected={date || undefined}
          onSelect={handleDateChange} // Use the custom handler
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
