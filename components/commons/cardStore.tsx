import { baseURL } from "@/utils/api";
import { IReadStore } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  store: IReadStore;
}

export default function CardStore({ store }: IProps) {
  return (
    <Link
      href={`/store/${store._id}`}
      className="overflow-hidden rounded-lg shadow-md group cursor-pointer border-[2px] hover:border-primary"
    >
      {/* image */}
      <div className="relative h-[150px] overflow-hidden">
        <Image
          src={`${baseURL}/stores/image/${store._id}/${store.images[0]}`}
          alt="banner"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* body */}
      <div className="p-2">
        <h2 className="font-semibold text-xl line-clamp-2 hover:text-primary transition-colors">
          {store.name}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <Image
            src="/avatar.png"
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full shadow-md"
          />
          <p className="line-clamp-1 font-medium hover:text-primary transition-colors">
            {store.owner.name}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <Image
              src="/comment.svg"
              alt="avatar"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="hover:underline">6</span>
          </div>
          <div className="flex items-center gap-2 ">
            <Image
              src="/HEART.svg"
              alt="avatar"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="hover:underline">6</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
