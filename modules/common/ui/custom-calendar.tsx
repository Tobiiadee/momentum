"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  add,
  sub,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  parse,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Text } from "./text";
import { dateColors } from "@/lib/constants/constants";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/modules/common/ui/hover-card";
import DateTask from "../components/shared/date-task";

interface DateType {
  day: string;
  month: string;
  year: string;
}

interface CalendarProps {
  getDate?: (date: DateType) => void;
  tasks?: Task[];
  asTask?: boolean;
}

const generateColor = (index: number): string => {
  return dateColors[index % dateColors.length];
};

const Calendar = ({ getDate, tasks, asTask }: CalendarProps) => {
  // console.log(tasks?.map((task) => task.due_date));

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const firstDayOfGrid = startOfWeek(firstDayOfMonth);
  const lastDayOfGrid = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({ start: firstDayOfGrid, end: lastDayOfGrid });

  return (
    <div className='max-w-md mx-auto rounded-lg p-4'>
      <div className='flex justify-between items-center mb-4 px-8'>
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => setCurrentMonth(sub(currentMonth, { months: 1 }))}
          className='p-2 hover:bg-gray-200 rounded-full'>
          <ChevronLeft size={20} />
        </Button>
        <Text variant={"h5"} className='font-semibold'>
          {format(currentMonth, "MMMM yyyy")}
        </Text>
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => setCurrentMonth(add(currentMonth, { months: 1 }))}
          className='p-2 hover:bg-gray-200 rounded-full'>
          <ChevronRight size={20} />
        </Button>
      </div>
      <Text
        variant={"p"}
        className='grid grid-cols-7 text-center text-gray-600'>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className='font-medium'>
            {day}
          </div>
        ))}
      </Text>
      <div className='grid grid-cols-7 gap-2 mt-2'>
        {days.map((day) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          
          const taskIndex =
            (tasks ?? []).findIndex((task) => {
              if (!task.due_date) return false; // Skip if due_date is missing

              let taskDate;

              // Check if due_date is in ISO format (e.g., "2025-02-13T00:00:00.000Z")
              if (!isNaN(Date.parse(task.due_date))) {
                taskDate = new Date(task.due_date);
              } else {
                // Parse custom format (e.g., "13 Feb, 2025")
                taskDate = parse(task.due_date, "d MMM, yyyy", new Date());
              }

              // Ensure taskDate is a valid date
              if (isNaN(taskDate.getTime())) {
                console.warn("Invalid date:", task.due_date); // Debugging log
                return false;
              }

              return format(taskDate, "yyyy-MM-dd") === formattedDate;
            }) ?? -1; // Default value

          // console.log(taskIndex);

          const isTask = taskIndex !== -1;

          const bgColor = isTask
            ? `${generateColor(taskIndex)} font-semibold`
            : "";

          return !asTask ? (
            <Text
              variant={"p"}
              key={day.toString()}
              onClick={() => {
                if (getDate)
                  getDate({
                    day: format(day, "d"),
                    month: format(day, "MMMM"),
                    year: format(day, "yyyy"),
                  });
              }}
              className={`p-1.5 text-center rounded-full cursor-pointer w-full ${
                isSameMonth(day, currentMonth) ? "text-black" : "text-gray-400"
              } 
                ${
                  isSameDay(day, today)
                    ? "bg-gray-300 font-medium"
                    : "hover:bg-gray-200 active:bg-gray-300 transition-colors"
                }`}>
              {format(day, "d")}
            </Text>
          ) : (
            <HoverCard key={day.toString()}>
              <HoverCardTrigger>
                <Text
                  variant={"p"}
                  key={day.toString()}
                  onClick={() => {
                    if (getDate)
                      getDate({
                        day: format(day, "d"),
                        month: format(day, "MMMM"),
                        year: format(day, "yyyy"),
                      });
                  }}
                  className={`p-1.5 text-center rounded-full cursor-pointer w-full ${
                    isSameMonth(day, currentMonth)
                      ? "text-black"
                      : "text-gray-400"
                  } 
                ${
                  isSameDay(day, today)
                    ? "bg-gray-300 font-medium"
                    : "hover:bg-gray-200 active:bg-gray-300 transition-colors"
                } ${bgColor}`}>
                  {format(day, "d")}
                </Text>
              </HoverCardTrigger>
              <HoverCardContent className="w-[20rem]">
                <DateTask />
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
