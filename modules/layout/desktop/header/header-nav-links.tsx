import { Text } from '@/modules/common/ui/text'
import Link from 'next/link'
import React from 'react'

export interface HeaderNavLinksProps {
    href: string
    label: string
}

export default function HeaderNavLinks({href, label}: HeaderNavLinksProps) {
  return (
    <Link href={href} className='text-foreground/70 hover:text-foreground transition'>
      <Text variant={"h5"} className=''>{label}</Text>
    </Link>
  )
}
