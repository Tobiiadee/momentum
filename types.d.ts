type UserDataType = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  phone_number: string;
  full_name: string;
  country: string;
  city_state: string;
  bio: string;
};

type Task = {
  task_id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  call_link?: string;
  list_label: string;
  list_icon: string;
  list_id: string;
  due_date: string;
  time_range: string;
  type: "list" | "group";
  is_deleted?: boolean;
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
  due_date: string;
  time_range: string;
  category?: taskCategory;
  completed: boolean;
  callLink?: string;
  list_id: string;
  list_icon: string;
  list_label?: string;
  type: "list" | "group";
};

type ListType = {
  list_id: string;
  label: string;
  icon: string | React.ReactNode;
  type?: "list";
  numberOfTask?: number;
  default?: boolean;
};

type ListArrayType = ListType[];

type MemberType = {
  id: string;
  name: string;
  email: string;
  image: string;
  created_at?: string;
};

type GroupRoleType = "Admin" | "Member" | "Guest";

type AddMemberType = {
  member_id: string;
  created_at?: string;
  role: GroupRoleType;
};

type GroupReturnType = {
  list_id: string;
  label: string;
  members: MemberType[];
  creator_id: string;
  type: "group";
};

type GroupType = {
  list_id: string;
  label: string;
  members: AddMemberType[];
  creator_id: string;
  type: "group";
};

type GroupArrayType = GroupType[];

type TaskType = {
  id: string;
  label: string;
  icon: React.ReactNode | string;
  numberOfTask: number;
  default: boolean;
  type?: "task";
};

type TaskFileType = {
  created_at: string;
  file_name: string;
  file_url: string;
  id: number;
  task_id: string;
  uploaded_at: string;
  index?: number;
};
