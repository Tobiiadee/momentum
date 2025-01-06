import { create } from "zustand";

type GroupTitleMembersType = {
  group_title: string;
  members: AddMemberType[];
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
  members: MemberType[];
  setMembers: (members: MemberType) => void;
  listIdFromDatabase: string;
  setListIdFromDatabase: (listId: string) => void;
  groupTitleMembers: GroupTitleMembersType;
  setGroupTitleMembers: (groupTitleMembers: GroupTitleMembersType) => void;
  deleteMember: (memberId: string) => void;
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
  setGroupTitleMembers: (groupTitleMembers) => set({ groupTitleMembers }),
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
