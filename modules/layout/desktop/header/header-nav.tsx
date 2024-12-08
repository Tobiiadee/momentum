import React, { ComponentProps } from "react";
import HeaderNavLinks from "./header-nav-links";

const navLinks: ComponentProps<typeof HeaderNavLinks>[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default function HeaderNav() {
  return (
    <div className='flex items-center space-x-6'>
      {navLinks.map((navLink) => (
        <HeaderNavLinks key={navLink.href} {...navLink} />
      ))}
    </div>
  );
}
