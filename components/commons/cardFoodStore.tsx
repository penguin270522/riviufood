import Image from "next/image";
import Link from "next/link";

interface IProps {
  cuisine: {
    key: string;
    label: string;
  };
}

export default function CardFoodStore({ cuisine }: IProps) {
  return (
    <Link
      href={`/review/post/${cuisine.key}`}
      className="relative overflow-hidden rounded-xl aspect-[2/1.1] p-3"
    >
      <Image
        src="/food/food_vietname.jpeg"
        alt="food_vietname"
        fill
        className="object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-[#00000070] flex items-end p-4">
        <div className="flex flex-col text-white">
          <h2 className="text-xl font-semibold">{cuisine.label}</h2>
          <p className="text-lg font-medium">{Math.round(Math.random() * 100)} bài viết</p>
        </div>
      </div>
    </Link>
  );
}
