import { CardComment, CardReview } from "@/components/commons";
import { IReview } from "@/utils/interface";
import { useRouter } from "next/navigation";

interface IProps {
  storeId: string;
  reviews: IReview[];
}

export default function StoreLeft({ storeId, reviews }: IProps) {
  const router = useRouter();
  return (
    <div className="w-[70%]">
      {/* heading */}
      <div className="flex justify-between items-center">
        <h4 className="text-txt-primary text-2xl font-semibold">
          Đánh giá từ cộng đồng ({reviews.length})
        </h4>
        <div
          className="py-4 px-6 text-lg font-semibold cursor-pointer bg-primary text-center text-white shadow rounded-2xl hover:opacity-80 transition-opacity"
          onClick={() => router.push(`/review?storeId=${storeId}`)}
        >
          Riviu địa điểm này
        </div>
      </div>

      {/* comments */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {reviews.length ? (
          reviews.map((review, index) => (
            <CardReview review={review} key={index} />
          ))
        ) : (
          <div className="text-xl text-center pt-6">
            Hãy là người đầu tiên rìviu địa điểm này.
          </div>
        )}
      </div>
    </div>
  );
}
