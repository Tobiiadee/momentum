import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ProfileBio() {
  return (
    <div className='flex space-x-6 w-full '>
      <div>
        <div className='relative w-32 aspect-square rounded-lg overflow-hidden'>
          <Image
            src={"/images/img2.jpg"}
            alt='profile-image'
            fill
            className='object-cover'
          />
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <Text variant={"h3"}>Oluwa Oluwatomisin</Text>
            <Text variant={"p"}>Software Engineer</Text>
          </div>
          <Button variant={"outline"}>
            <Text variant={"p"}>Edit profile</Text>
          </Button>
        </div>
        <div className='flex items-center space-x-2'>
          <Text variant={"p"} className='mt-4 w-[70ch]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            natus, nemo hic aliquam facilis provident consequuntur fugit vel
            recusandae cumque sit quibusdam tempora id dicta dolorum totam
            incidunt voluptate corporis! <span></span>
          </Text>
          <Button variant={"ghost"} size={"sm"} className=''>
            <SquarePen size={20} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
