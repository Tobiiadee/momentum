"use client";

import { useEditProfile } from "@/hooks/use-edit-profile";
import useUserStore from "@/modules/store/user-store";
import { LoaderCircle, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ProfilePictureSelect() {
  //Send selected image to database

  const { user } = useUserStore();
  const { uploadFileMutate, isUploadingFile, isEditProfileSuccess } =
    useEditProfile(user?.id as string);

  const placeholder = "/images/image_placeholder.jpg";

  // console.log(user?.avatar);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFileMutate(file);
    }

    if (!isUploadingFile && isEditProfileSuccess) {
      window.location.reload();
    }
  };

  // console.log(user?.avatar);

  return (
    <div className=''>
      <label htmlFor='profile-picture' className='cursor-pointer'>
        <div className='relative w-24 aspect-square rounded-lg overflow-hidden'>
          {!!user?.avatar ? (
            <div className='relative w-full h-full group grid place-items-center overflow-hidden'>
              <Image
                src={user?.avatar || placeholder}
                alt='profile-image'
                fill
                className='object-cover'
              />
              <div className='z-20 hidden group-hover:block'>
                <Plus size={40} strokeWidth={1} className='text-border' />
              </div>
            </div>
          ) : (
            <Image
              src={placeholder}
              alt='profile-image'
              fill
              className='object-cover'
            />
          )}
          {isUploadingFile && (
            <div className='absolute w-full h-full top-0 left-0 bg-foreground/10 backdrop-blur-md grid place-items-center'>
              <LoaderCircle
                size={30}
                strokeWidth={3}
                className='animate-spin text-foreground/20'
              />
            </div>
          )}
        </div>
      </label>
      <input
        onChange={handleFileChange}
        placeholder='Profile Picture'
        type='file'
        id='profile-picture'
        accept='image/*'
        className='hidden'
      />
    </div>
  );
}
