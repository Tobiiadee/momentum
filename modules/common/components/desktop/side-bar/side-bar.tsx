"use client";

import React from "react";
import Logo from "../../shared/logo";
import SideBarLinks from "./side-bar-links";
import CreateNewList from "./new list/create-new-list";
import Group from "./group/group";
import { useListStore } from "@/modules/store/list-store";
import useGroupStore from "@/modules/store/group-store";
import Modal from "@/modules/common/ui/modal";
import NewList from "./new list/new-list";
import { AnimatePresence } from "framer-motion";
import NewListItem from "./new list/new-list-item";
import { HouseSvg } from "@/modules/assets/svgs";
import NewGroup from "./group/new-group";

const links = [
  {
    href: "/",
    label: "home",
    numberOfTask: 20,
    icon: <HouseSvg />,
  },
  {
    href: "/completed",
    label: "completed",
    numberOfTask: 10,
    check: true,
  },
  {
    href: "/personal",
    label: "Personal",
    numberOfTask: 5,
    check: true,
  },
  {
    href: "/work",
    label: "Work",
    numberOfTask: 3,
    check: true,
  },
];

export default function SideBar() {
  const isList = useListStore((state) => state.isList);
  const setIsList = useListStore((state) => state.setIsList);
  const lists = useListStore((state) => state.lists);

  const isGroup = useGroupStore((state) => state.isGroup);
  const setIsGroup = useGroupStore((state) => state.setIsGroup);

  return (
    <>
      <div className='fixed w-[20rem] flex flex-col space-y-8 h-screen min-h-screen bg-background px-4 pt-6 pb-10 shadow-md overflow-y-auto'>
        <Logo />
        <div className='flex flex-col space-y-3'>
          <nav className='flex flex-col space-y-3'>
            {links.map((link, index) => (
              <SideBarLinks key={index + link.href} {...link} />
            ))}
          </nav>

          <div className='flex flex-col space-y-3 w-full'>
            {lists?.map((list) => (
              <NewListItem key={list.id} id={list.id} name={list.name} />
            ))}
          </div>
        </div>

        <CreateNewList />
        <Group />
      </div>

      <AnimatePresence mode='wait'>
        {isList && (
          <Modal onClick={() => setIsList(false)}>
            <NewList />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {isGroup && (
          <Modal onClick={() => setIsGroup(false)}>
            <NewGroup />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
