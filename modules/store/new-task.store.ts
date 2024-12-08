import { create } from "zustand";

interface NewTaskStore {
  isNewTask: boolean;
  setIsNewTask: (isNewTask: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  taskDate: string;
  setTaskDate: (taskDate: string) => void;
  isTaskTime: boolean;
  setIsTaskTime: (isTaskTime: boolean) => void;
  taskTimeFrom: string;
  setTaskTimeFrom: (taskTime: string) => void;
  taskTimeUntil: string;
  setTaskTimeUntil: (taskTime: string) => void;
  isTaskList: boolean;
  setIsTaskList: (isTaskList: boolean) => void;
  selectedCategory: taskCategory | null;
  setSelectedCategory: (selectedCategory: taskCategory) => void;
  task: TaskItem[];
  setTask: (task: TaskItem) => void;
  reset: () => void;
}

const useNewTaskStore = create<NewTaskStore>((set) => ({
  isNewTask: false,
  setIsNewTask: (isNewTask) => set(() => ({ isNewTask })),
  title: "",
  setTitle: (title) => set(() => ({ title })),
  taskDate: "",
  setTaskDate: (taskDate) => set(() => ({ taskDate })),
  isTaskTime: false,
  setIsTaskTime: (isTaskTime) => set(() => ({ isTaskTime })),
  taskTimeFrom: "",
  setTaskTimeFrom: (taskTime) => set(() => ({ taskTimeFrom: taskTime })),
  taskTimeUntil: "",
  setTaskTimeUntil: (taskTime) => set(() => ({ taskTimeUntil: taskTime })),
  isTaskList: false,
  setIsTaskList: (isTaskList) => set(() => ({ isTaskList: isTaskList })),
  selectedCategory: null,
  setSelectedCategory: (selectedCategory) =>
    set(() => ({ selectedCategory: selectedCategory })),
  task: [],
  setTask: (newTask) => set((state) => ({ task: [...state.task, newTask] })),
  reset: () =>
    set(() => ({
      isNewTask: false,
      title: "",
      taskDate: "",
      isTaskTime: false,
      taskTimeFrom: "",
      taskTimeUntil: "",
      isTaskList: false,
      selectedCategory: null,
      task: [],
    })),
}));

export default useNewTaskStore;
