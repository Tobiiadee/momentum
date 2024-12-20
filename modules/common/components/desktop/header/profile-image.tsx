import useUserStore from "@/modules/store/user-store";
import Image from "next/image";

export default function ProfileImage() {
  const user = useUserStore((state) => state.user);

  return (
    <div className='relative rounded-full w-8 aspect-square flex items-center justify-center overflow-hidden'>
      <Image
        src={user?.avatar || user?.picture || "/images/img2.jpg"}
        alt='avatar'
        fill
        className='object-cover'
      />
    </div>
  );
}
