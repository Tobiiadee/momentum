"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeInOutvariants } from "../desktop/side-bar/group/new-group";
import TaskSaveBtn from "./task-save-btn";
import SetTimesBtn from "./set-time-btn";
import ListSelect from "./list-select";
import TaskNew from "./task-new";
import TaskCalendar from "./task-calendar";
import useNewTaskStore from "@/modules/store/new-task.store";
import SelectedTaskTime from "./selected-task-time";
import TimeSetter from "./time-setter";
import NewTaskInput from "./new-task-input";
import AvialableList from "./avialable-list";

export default function NewTask() {
  const isTaskTime = useNewTaskStore((state) => state.isTaskTime);
  const isTaskList = useNewTaskStore((state) => state.isTaskList);

  return (
    <motion.div
      variants={FadeInOutvariants}
      initial='hidden'
      animate='visible'
      exit={"exit"}
      className='absolute z-50 left-[35%] -translate-x-1/2 bottom-16 px-2 py-2 w-[30%] min-h-52 bg-background shadow-md rounded-md flex flex-col space-y-2'>
      {isTaskList && <NewTaskInput />}
      {!isTaskList && <TaskNew />}
      <ListSelect />
      {!isTaskList && <SelectedTaskTime />}
      {isTaskList ? (
        <AvialableList />
      ) : (
        <div>{isTaskTime ? <TimeSetter /> : <TaskCalendar />}</div>
      )}

      {!isTaskList && <SetTimesBtn />}
      <TaskSaveBtn />
    </motion.div>
  );
}
