import { baseURL } from "@/utils/api";
import { IReview } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  reviewDetail?: IReview;
}

export default function ReviewRight({ reviewDetail }: IProps) {
  return (
    <div className="w-[33%]">
      <div className="sticky top-[8%]">
        {/* information owner review */}
        <div className="bg-white rounded-xl p-4 shadow-lg ">
          <Link href={`/user/profile?userId=${reviewDetail?.author._id}`}>
            <div className="flex items-center gap-4 pb-4">
              <div className="relative h-full w-[20%] aspect-[1/1]">
                <Image
                  src={
                    reviewDetail?.author?.avatar
                      ? `${baseURL}/users/avatar/${reviewDetail?.author?.avatar}`
                      : "/avatar.png"
                  }
                  alt="banner"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <h4 className="text-txt-primary text-2xl font-semibold flex justify-center gap-3 flex-col">
                  {reviewDetail?.author?.name}
                </h4>
                <p>{reviewDetail?.author.email}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center text-xl ">
                  <div className="text-txt-primary font-semibold">7</div>
                  <p className="text-txt-second font-medium">Bài viết</p>
                </div>
                <div className="text-center text-xl ">
                  <div className="text-txt-primary font-semibold">1</div>
                  <p className="text-txt-second font-medium">Người theo dõi</p>
                </div>
                <div className="text-center text-xl ">
                  <div className="text-txt-primary font-semibold">1</div>
                  <p className="text-txt-second font-medium">Đang theo dõi</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* quảng cáo */}
        <div className="relative aspect-[1/1] mt-6">
          <Image
            src="/banner-detail-star.png"
            alt="banner-detail-star"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        {/* <div className="relative aspect-[1/1] mt-6">
        <Image
          src="/banner-main.png"
          alt="banner-detail-star"
          fill
          className="object-cover rounded-xl"
        />
      </div> */}
      </div>
    </div>
  );
}
