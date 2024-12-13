import React from "react";
import {
  GroupItemImage,
  GroupRemainingMembers,
} from "../desktop/side-bar/group/group-item";

interface TaskGroupImgProps {
  members: MemberType[];
}

export default function TaskGroupImg({ members }: TaskGroupImgProps) {
  const slicedMembers = members.slice(0, 3);
  const remainingMembers = members.length - 3;

  return (
    <div className='flex items-center'>
      {slicedMembers.map((members) => (
        <GroupItemImage key={members.id + members.email} image='img3.jpg' />
      ))}

      {members.length > 3 && !!remainingMembers && (
        <GroupRemainingMembers remainingMembers={remainingMembers} />
      )}
    </div>
  );
}
