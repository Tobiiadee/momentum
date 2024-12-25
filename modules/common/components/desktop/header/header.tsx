import React from "react";
import AdminProfile from "./admin-profile";
import Greeting from "./greeting";
import Notification from "./notification";

export default function Header() {
  return (
    <div className='flex justify-between items-start'>
      <Greeting />
      <div className='flex items-center space-x-6'>
        <Notification />
        <AdminProfile />
      </div>
    </div>
  );
}
