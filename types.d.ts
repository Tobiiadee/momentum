type TaskItem = {
  id: string;
  title: string;
  description: string;
  timeRange: string;
  category: "personal" | "work"| "completed";
  completed: boolean;
};
