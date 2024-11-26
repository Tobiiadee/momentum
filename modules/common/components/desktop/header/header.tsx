import React from "react";
import AdminProfile from "./admin-profile";
import Greeting from "./greeting";

export default function Header() {
  return (
    <div className='flex justify-between items-start'>
      <Greeting />
      <AdminProfile />
    </div>
  );
}
