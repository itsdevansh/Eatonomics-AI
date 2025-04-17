import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WeekSelectorProps {
  selectedWeek: number;
  onWeekChange: (week: number) => void;
  weeks: number[];
}

export const WeekSelector = ({ selectedWeek, onWeekChange, weeks }: WeekSelectorProps) => {
  return (
    <div className="mb-6">
      <Select
        value={selectedWeek.toString()}
        onValueChange={(value) => onWeekChange(Number(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select week" />
        </SelectTrigger>
        <SelectContent>
          {weeks.map((week) => (
            <SelectItem key={week} value={week.toString()}>
              Week {week}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};