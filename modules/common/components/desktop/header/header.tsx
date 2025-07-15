import React from "react";
import AdminProfile from "./admin-profile";
import Greeting from "./greeting";
import Notification from "./notification";
import HeaderSearch from "./header-search";

export default function DashboardHeader() {
  return (
    <div className='lg:flex justify-between items-start hidden'>
      <div className='flex items-start space-x-8 w-[80%]'>
        <Greeting />
        <HeaderSearch />
      </div>
      <div className='flex items-center space-x-6'>
        <Notification />
        <AdminProfile />
      </div>
    </div>
  );
}
