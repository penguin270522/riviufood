import { baseURL } from "@/utils/api";
import { IStore } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  store: IStore;
}

export default function CardTopStore({ store }: IProps) {
  return (
    <Link href={`/store/${store._id}`} className="p-3 flex gap-2 hover:bg-input transition-colors rounded-xl cursor-pointer shadow-sm">
      <div className="relative h-full w-[30%] aspect-[1/1]">
        <Image
          src={`${baseURL}/stores/image/${store._id}/${store?.images[0]}`}
          alt="banner"
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div>
        <h2 className="text-xl text-txt-primary font-semibold line-clamp-1">
          {store.name}
        </h2>
        <p className="text-lg text-txt-second font-medium line-clamp-2 mt-2">
          {store.address}
        </p>
        <div className="flex gap-1 items-center mt-2">
          <Image src="/star_icon.svg" alt="star_icon" width={20} height={20} />
          <h5 className="font-semibold text-lg text-txt-primary">5.0</h5>
          <span>/ 5 điểm</span>
        </div>
      </div>
    </Link>
  );
}
