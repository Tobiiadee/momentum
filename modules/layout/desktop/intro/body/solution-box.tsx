import { Text } from "@/modules/common/ui/text";
import { ListCheck, Users, Waypoints } from "lucide-react";
import React from "react";

const solutions = [
  {
    text: "Ensure your team is always on the same page with team sharing and transparent updates",
    icon: <Waypoints size={24} strokeWidth={1.5} />,
  },
  {
    text: "Prioritize yand manage task and project progress with a clear and concise timeline",
    icon: <ListCheck size={24} strokeWidth={1.5} />,
  },
  {
    text: "Keep your team informed and motivated with regular check-ins and progress updates",
    icon: <Users size={24} strokeWidth={1.5} />,
  },
];

export default function Solutions() {
  return (
    <div className='self-center lg:w-[85%] lg:pl-14'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0'>
        {solutions.map((solution, index) => (
          <SolutionBox key={index} {...solution} />
        ))}
      </div>
    </div>
  );
}

interface SolutionBoxProps {
  text: string;
  icon: React.ReactNode;
}

export function SolutionBox({ text, icon }: SolutionBoxProps) {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='p-1.5 self-center lg:self-start rounded-full grid place-items-center border w-max'>{icon}</div>
      <Text variant={"p"} className='w-[25ch]'>
        {text}
      </Text>
    </div>
  );
}
