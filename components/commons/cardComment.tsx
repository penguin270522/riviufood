import { baseURL } from "@/utils/api";
import { formatDateTime } from "@/utils/common";
import { IComment } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  comment: IComment;
}

export default function CardComment({ comment }: IProps) {
  return (
    <div className="flex gap-5">
      <Link
        href={`/user/profile?userId={userId}`}
        className="relative h-14 w-14 hover:shadow-xl transition-shadow"
      >
        <Image
          src={
            comment?.author?.avatar
              ? `${baseURL}/users/avatar/${comment?.author?.avatar}`
              : "/avatar_1.png"
          }
          alt="avatar"
          fill
          className="object-cover rounded-full"
        />
      </Link>

      {/* content comment */}
      <div className="flex flex-1 flex-col gap-2">
        {/* heading */}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link
              href={`/user/profile?userId=${comment?.author?._id}`}
              className="text-xl font-semibold transition-colors hover:text-primary"
            >
              {comment?.author?.name}
            </Link>
            <p className="text-txt-second">
              {formatDateTime(comment.created_at)}
            </p>
          </div>
          <Image
            src="/heart_black.svg"
            alt="HEART"
            width={24}
            height={24}
            className="object-cover rounded-full"
          />
        </div>

        {/* content */}
        <p className="text-lg">{comment.content}</p>
      </div>
    </div>
  );
}
