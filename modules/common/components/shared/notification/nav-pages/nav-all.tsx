import React from "react";
import NotificationItem from "../components/notification-item";

export default function NavAll() {
  return (
    <div className='flex flex-col space-y-2 divide-y px-2'>
      {Array.from({ length: 10 }).map((_, index) => (
        <NotificationItem key={index} />
      ))}
    </div>
  );
}
