import Image from "next/image";

export default function CardOutstanding() {
  return (
    <div className="p-3 flex gap-2 hover:bg-input transition-colors rounded-xl cursor-pointer shadow-sm">
      <div className="relative h-full w-[30%] aspect-[1/1]">
        <Image
          src="/banner-main.png"
          alt="banner"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl text-txt-primary font-semibold line-clamp-1">Buffet đại dương</h2>
        <p className="text-lg text-txt-second font-medium line-clamp-2">LF-22 , tầng 5 giga marin, quận ngũ hành sơn</p>
        <div className="flex gap-1 items-center mt-auto">
          <Image src="/star_icon.svg" alt="star_icon" width={20} height={20} />
          <h5 className="font-semibold text-lg text-txt-primary">4.5</h5>
          <span>/ 5 điểm</span>
        </div>
      </div>
    </div>
  );
}
