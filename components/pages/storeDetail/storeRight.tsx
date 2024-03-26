import CardOutstanding from "@/components/commons/cardOutstanding";
import { IStore } from "@/utils/interface";
import Image from "next/image";

interface IProps {
  store?: IStore;
}

export default function StoreRight({ store }: IProps) {
  return (
    <div className="w-[30%]">
      <div className="relative aspect-[1/1]">
        <Image
          src="/banner-detail-star.png"
          alt="banner-detail-star"
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/*  */}
      <div className="bg-white rounded-xl p-4 shadow-lg mt-6">
        <h2 className="text-xl text-txt-primary font-semibold py-3">
          Thông tin chung
        </h2>

        <div className="border-t border-[#f4f5f8] py-2 grid grid-cols-1 gap-4">
          <div className="flex flex-wrap gap-3 text-lg text-txt-primary font-medium">
            <Image src="/address.svg" alt="star_icon" width={20} height={20} />
            <span>Địa chỉ:</span>
            <p>{store?.address}</p>
          </div>
          {/* price infor */}

          <div className="flex flex-wrap gap-3 text-lg text-txt-primary font-medium my-2">
            <Image src="/dolar.svg" alt="star_icon" width={24} height={24} />
            <span>Giá tiền:</span>
            <p>
              {store?.price_lowest}VND - {store?.price_highest}VND
            </p>
          </div>
          {/* time infor */}
          <div className="flex flex-wrap gap-3 text-lg text-txt-primary font-medium">
            <Image src="/time.svg" alt="star_icon" width={20} height={20} />
            <span>Thời gian:</span>
            <span className="text-second">Đang mở cửa</span>
            <span>
              ({store?.close_time} - {store?.open_time})
            </span>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="bg-white rounded-xl p-4 shadow-lg mt-6">
        <h2 className="text-xl text-txt-primary font-semibold py-3">
          Địa điểm gần đây
        </h2>

        <div className="border-t border-[#f4f5f8] py-2 grid grid-cols-1 gap-4">
          <CardOutstanding />
          <CardOutstanding />
          <CardOutstanding />
        </div>
      </div>
      {/*  */}
      <div className="bg-white rounded-xl p-4 shadow-lg mt-6">
        <h2 className="text-xl text-txt-primary font-semibold py-3">
          Địa điểm tương tự
        </h2>

        <div className="border-t border-[#f4f5f8] py-2 grid grid-cols-1 gap-4">
          <CardOutstanding />
          <CardOutstanding />
          <CardOutstanding />
        </div>
      </div>
    </div>
  );
}
