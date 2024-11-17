import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "../inputs/time-picker";
import { Period } from "@/utils/time-picker";
import { TimePeriodSelect } from "../select/time-period";
 
interface TimePickerDemoProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}
 
export function TimePicker({ value, onChange }: TimePickerDemoProps) {
  const [period, setPeriod] = React.useState<Period>("PM");
 
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);
 
  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs font-[400]">
          Hours
        </Label>
        <TimePickerInput
          picker="12hours"
          period={period}
          date={value}
          setDate={onChange}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs font-[400]">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          id="minutes12"
          date={value}
          setDate={onChange}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs font-[400]">
          Seconds
        </Label>
        <TimePickerInput
          picker="seconds"
          id="seconds12"
          date={value}
          setDate={onChange}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        {/* <Label htmlFor="period" className="text-xs font-[400]">
          Period
        </Label> */}
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={value}
          setDate={onChange}
          ref={periodRef}
          onLeftFocus={() => secondRef.current?.focus()}
        />
      </div>
    </div>
  );
}