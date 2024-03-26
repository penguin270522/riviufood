import Image from "next/image";

export default function CardUserOutstanding() {
  return (
    <div className="p-3 flex gap-2 hover:bg-input transition-colors rounded-xl cursor-pointer shadow-sm">
      <div className="relative h-full w-[30%] aspect-[1/1]">
        <Image
          src="/banner-main.png"
          alt="banner"
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex justify-center flex-col">
        <h2 className="text-xl text-txt-primary font-semibold line-clamp-1">
          Nguyển trần phương tuấn
        </h2>
        <p className="text-lg text-txt-second font-medium line-clamp-2">
            hghg@gmail.com.cn
        </p>
      </div>
    </div>
  );
}
