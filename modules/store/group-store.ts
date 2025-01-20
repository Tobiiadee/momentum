import { create } from "zustand";

type GroupTitleMembersType = {
  group_title: string;
  members: AddMemberType[];
};

type deleteGroupObj = {
  list_Id: string;
  group_label: string;
};

interface GroupStoreType {
  isGroup: boolean;
  setIsGroup: (isGroup: boolean) => void;
  group: GroupType | null;
  setGroup: (group: GroupType | null) => void;
  groups: GroupType[] | null;
  setGroups: (group: GroupType | GroupType[]) => void;
  deleteGroup: (groupId: string) => void;
  isGroupMember: boolean;
  isGroupName: string;
  setIsGroupMember: (isGroupMember: boolean) => void;
  setIsGroupName: (isGroupName: string) => void;
  members: MemberType[] | [];
  setMembers: (members: MemberType) => void;
  listIdFromDatabase: string;
  setListIdFromDatabase: (listId: string) => void;
  groupTitleMembers: GroupTitleMembersType;
  setGroupTitleMembers: (groupTitleMembers: GroupTitleMembersType) => void;
  isDeleteGroup: boolean;
  setIsDeleteGroup: (isDeleteGroup: boolean) => void;
  deleteGroupObject: deleteGroupObj | null;
  setDeleteGroupObject: (deleteGroupObj: deleteGroupObj) => void;
  isAddMember: boolean;
  setIsAddMember: (isAddMember: boolean) => void;
  addMemberArray: AddMemberType[];
  setAddMemberArray: (addMemberArray: AddMemberType[]) => void;
  deleteMember: (memberId: string) => void;
  isGroupChat: boolean;
  setIsGroupChat: (isGroupChat: boolean) => void;
  reset: () => void;
}

export const useGroupStore = create<GroupStoreType>((set) => ({
  isGroup: false,
  setIsGroup: (isGroup) => set({ isGroup }),

  group: null,
  setGroup: (group) => set({ group }),

  groups: null,
  setGroups: (newGroups) =>
    set((state) => ({
      groups: state.groups
        ? [
            ...state.groups,
            ...(Array.isArray(newGroups) ? newGroups : [newGroups]),
          ]
        : Array.isArray(newGroups)
        ? newGroups
        : [newGroups],
    })),

  deleteGroup: (groupId) =>
    set((state) => ({
      groups:
        state.groups?.filter((group) => group.list_id !== groupId) || null,
    })),

  isGroupMember: false,
  setIsGroupMember: (isGroupMember) => set({ isGroupMember }),

  isGroupName: "",
  setIsGroupName: (isGroupName) => set({ isGroupName }),
  members: [],
  setMembers: (members) =>
    set((state) => ({ members: [...state.members, members] })),
  deleteMember: (groupId) =>
    set((state) => ({
      members: state.members?.filter((member) => member.id !== groupId) || null,
    })),
  listIdFromDatabase: "",
  setListIdFromDatabase: (listId) => set({ listIdFromDatabase: listId }),
  groupTitleMembers: {
    group_title: "",
    members: [],
  },
  isAddMember: false,
  setIsAddMember: (isAddMember) => set({ isAddMember }),
  addMemberArray: [],
  setAddMemberArray: (addMemberArray) => set({ addMemberArray }),
  setGroupTitleMembers: (groupTitleMembers) => set({ groupTitleMembers }),
  isDeleteGroup: false,
  setIsDeleteGroup: (isDeleteGroup) => set({ isDeleteGroup }),
  deleteGroupObject: null,
  setDeleteGroupObject: (deleteGroupObj) =>
    set(() => ({
      deleteGroupObject: deleteGroupObj,
    })),
  isGroupChat: false,
  setIsGroupChat: (isGroupChat) => set({ isGroupChat }),
  reset: () =>
    set({
      isGroup: false,
      group: null,
      isGroupMember: false,
      members: [],
      isGroupName: "",
    }),
}));

export default useGroupStore;
