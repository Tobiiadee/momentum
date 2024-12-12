import { tasks } from "@/modules/assets/DUMMY_TASK";
import { list } from "@/modules/assets/list";

// Calculate task counts dynamically
export const updatedList = list.map((list) => {
    let taskCount = 0;
    

    if (list.label === "home") {
      taskCount = tasks.length; // Total tasks
    } else if (list.label === "completed") {
      taskCount = tasks.filter((task) => task.completed).length;
    } else if (list.label === "personal") {
      taskCount = tasks.filter((task) => task.category.label === "personal").length;
    } else if (list.label === "work") {
      taskCount = tasks.filter((task) => task.category.label === "work").length;
    }

    return { ...list, numberOfTask: taskCount }; // Update numberOfTask
  });