import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/modules/common/ui/button";
import Modal from "@/modules/common/ui/modal";
import RenameListInput from "./rename-list-input";
import { AnimatePresence } from "framer-motion";
import useListStore from "@/modules/store/list-store";
import { useParams, useSearchParams } from "next/navigation";

export default function ListDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const setDeleteObject = useListStore((state) => state.setDeleteObject);
  const { listId } = useParams();

  //Get list name from url
  const searchParams = useSearchParams();

  const label = searchParams.get("label");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant={"ghost"}
            className="p-0 h-8 w-8 bg-secondary hover:bg-secondary-hover"
          >
            <EllipsisVertical size={20} className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem>Add Task</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Rename List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setDeleteObject({
                list_Id: listId ? (listId as string) : "",
                list_label: label ? (label as string) : "",
              })
            }
          >
            Delete List
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AnimatePresence mode="wait">
        {isOpen && (
          <Modal onClick={() => setIsOpen(false)}>
            <RenameListInput setIsOpen={setIsOpen} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
