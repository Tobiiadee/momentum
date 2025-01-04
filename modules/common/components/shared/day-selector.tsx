import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export default function DaySelector() {
  return (
    <Select>
      <SelectTrigger className='w-[150px] bg-background border-none text-xs'>
        <SelectValue placeholder='Day' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='today'>Today</SelectItem>
        <SelectItem value='yesterday'>Yesterday</SelectItem>
        <SelectItem value='this-week'>This week</SelectItem>
      </SelectContent>
    </Select>
  );
}
