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
      <SelectTrigger className='w-[180px] bg-background border-none ring-0'>
        <SelectValue placeholder='Day' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='light'>Today</SelectItem>
        <SelectItem value='dark'>Yesterday</SelectItem>
        <SelectItem value='system'>This week</SelectItem>
      </SelectContent>
    </Select>
  );
}
