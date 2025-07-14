import Image from "next/image";

interface ProfileImageProps {
  image: string;
}

export default function ProfileImage({ image }: ProfileImageProps) {
  console.log(image);

  return (
    <div className="relative rounded-full w-9 lg:w-8 aspect-square flex items-center justify-center overflow-hidden">
      <Image
        src={image || "/images/image_placeholder.jpg"}
        alt="avatar"
        fill
        className="object-cover"
      />
    </div>
  );
}
