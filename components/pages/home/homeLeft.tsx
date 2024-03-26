import CardFoodStore from "@/components/commons/cardFoodStore";
import Stores from "@/components/commons/stores";
import { CUISINE_NATIONAL_FOOD } from "@/utils/data";
import Image from "next/image";

export default function HomeLeft() {
  return (
    <div className="w-[67%]">
      {/* banner */}
      <div className="relative h-[350px] rounded-xl overflow-hidden">
        <Image
          src="/banner-main.png"
          alt="banner top"
          fill
          className="object-cover"
        />
      </div>

      {/* tags */}
      <div className="py-6">
        {/* heading */}
        <div className="flex item-center justify-between mb-4">
          <h4 className="text-txt-second font-semibold text-2xl">
            Dành cho bạn
          </h4>
          <p className="text-txt-second text-xl font-medium cursor-pointer transition-all hover:text-second">
            Xem thêm
          </p>
        </div>

        {/* lisst store by */}
        <div className="grid grid-cols-3 gap-4">
          {CUISINE_NATIONAL_FOOD.map((cuisine, index) => (
            <CardFoodStore key={index} cuisine={cuisine} />
          ))}
        </div>
      </div>

      {/* danh sách cửa hàng */}
      <Stores />
    </div>
  );
}
