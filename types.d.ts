type taskCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type TaskItem = {
  id: string;
  title: string;
  description?: string;
  date: string;
  timeRange: string;
  category: taskCategory;
  completed: boolean;
  type: "list" | "group";
};

type ListType = {
  id: string;
  label: string;
  icon: React.ReactNode;
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
