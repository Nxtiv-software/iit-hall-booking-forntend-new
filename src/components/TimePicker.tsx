import { Input } from "@/components/ui/input";
import * as React from "react";

interface TimePickerProps {
  timevalue: string;
  setTimevalue: (value: string) => void;
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ timevalue, setTimevalue }, ref) => {
    return (
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <Input
            ref={ref}
            type="time"
            value={timevalue}
            onChange={(e) => {
              setTimevalue(e.target.value);
            }}
            id="time-picker"
            step="60"
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

export default TimePicker;
