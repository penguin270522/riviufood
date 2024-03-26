import { baseURL } from "@/utils/api";
import { IUser } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  user: IUser;
}

export default function CardTopReview({ user }: IProps) {
  return (
    <Link
      href={`/user/profile?uid=${user._id}`}
      className="p-3 flex gap-2 hover:bg-input transition-colors rounded-xl cursor-pointer shadow-sm"
    >
      <div className="relative h-full w-[30%] aspect-[1/1]">
        <Image
          src={
            user?.avatar
              ? `${baseURL}/users/avatar/${user?.avatar}`
              : "/avatar_1.png"
          }
          alt="banner"
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex justify-center flex-col">
        <h2 className="text-xl text-txt-primary font-semibold line-clamp-1">
          {user.name}
        </h2>
        <p className="text-lg text-txt-second font-medium line-clamp-2">
          {user.email}
        </p>
      </div>
    </Link>
  );
}
