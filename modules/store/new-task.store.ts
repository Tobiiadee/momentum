import { create } from "zustand";

interface NewTaskStore {
  isNewTask: boolean;
  setIsNewTask: (isNewTask: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
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
  type: "list" | "group";
  setType: (type: "list" | "group") => void;
  isTask: boolean;
  setIsTask: (isTask: boolean) => void;
  list: string;
  setList: (list: string) => void;
  listId: string;
  setListId: (listId: string) => void;
  previewTask: boolean;
  setPreviewTask: (previewTask: boolean) => void;
  callMethod: string;
  setCallMethod: (method: string) => void;
  callLink: string;
  setCallLink: (link: string) => void;
  isReschedule: boolean;
  setIsReschedule: (isReschedule: boolean) => void;
  taskId: string | null;
  setTaskId: (taskId: string) => void;
  reset: () => void;
  isValid: () => boolean;
}

const useNewTaskStore = create<NewTaskStore>((set, get) => ({
  isNewTask: false,
  setIsNewTask: (isNewTask) => set(() => ({ isNewTask })),
  taskId: null,
  setTaskId: (taskId) => set(() => ({ taskId })),
  title: "",
  setTitle: (title) => set(() => ({ title })),
  description: "",
  setDescription: (description) => set(() => ({ description })),
  type: "list",
  setType: (type) => set(() => ({ type })),
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
  isTask: false,
  setIsTask: (isTask) => set(() => ({ isTask })),
  previewTask: false,
  setPreviewTask: (previewTask) => set(() => ({ previewTask })),
  callMethod: "",
  setCallMethod: (method) => set(() => ({ callMethod: method })),
  callLink: "",
  setCallLink: (link) => set(() => ({ callLink: link })),
  list: "",
  setList: (list) => set(() => ({ list })),
  listId: "",
  setListId: (listId) => set(() => ({ listId })),
  isReschedule: false,
  setIsReschedule: (isReschedule) => set(() => ({ isReschedule })),
  reset: () =>
    set(() => ({
      isNewTask: false,
      title: "",
      description: "",
      type: "list",
      taskDate: "",
      isTaskTime: false,
      taskTimeFrom: "",
      taskTimeUntil: "",
      isTaskList: false,
      selectedCategory: null,
      task: [],
      isTask: false,
      previewTask: false,
      callMethod: "whatsapp",
      callLink: "",
      list: "",
    })),
  isValid: () => {
    const { title, taskDate, taskTimeFrom, taskTimeUntil, list } = get();
    return (
      title.trim() !== "" &&
      taskDate.trim() !== "" &&
      taskTimeFrom.trim() !== "" &&
      taskTimeUntil.trim() !== "" &&
      list.trim() !== ""
    );
  },
}));

export default useNewTaskStore;
