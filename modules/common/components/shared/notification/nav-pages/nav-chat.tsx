import React from "react";
import ChatNotification from "../components/chat-notification";

export default function NavChat() {
  return (
    <div className='flex flex-col space-y-2 px-2 mt-4'>
      <ChatNotification />
    </div>
  );
}
