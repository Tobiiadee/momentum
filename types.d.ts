type UserDataType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  picture: string;
};

type Task = {
  task_id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  call_link?: string;
  list: string;
  due_date: string;
  time_range: string;
  type: "list" | "group";
};

type taskCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type TaskItem = {
  task_id: string;
  title: string;
  description?: string;
  dueDate: string;
  timeRange: string;
  category?: taskCategory;
  completed: boolean;
  callLink?: string;
  type: "list" | "group";
};

type ListType = {
  id: string;
  label: string;
  icon: React.ReactNode | string;
  numberOfTask: number;
  default: boolean;
  type?: "list";
};

type ListArrayType = ListType[];

type MemberType = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type GroupType = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  numberOfTask: number;
  members: MemberType[];
  default: boolean;
  type?: "group";
};

type GroupArrayType = GroupType[];

type TaskType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  numberOfTask: number;
  default: boolean;
  type?: "task";
};
