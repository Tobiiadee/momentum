import React, { ComponentProps } from "react";
import HeaderNavLinks from "./header-nav-links";

const navLinks: ComponentProps<typeof HeaderNavLinks>[] = [
  {
    href: "/",
    label: "Features",
  },
  {
    href: "/",
    label: "Solutions",
  },
  {
    href: "/",
    label: "Resources",
  },
  {
    href: "/",
    label: "Pricing",
  },
];

export default function HeaderNav() {
  return (
    <div className='flex items-center space-x-6'>
      {navLinks.map((navLink) => (
        <HeaderNavLinks key={navLink.label} {...navLink} />
      ))}
    </div>
  );
}
