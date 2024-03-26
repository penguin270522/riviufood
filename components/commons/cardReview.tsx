import { useAppSelector } from "@/redux/hooks";
import { baseURL } from "@/utils/api";
import { formatDateTime } from "@/utils/common";
import { IReview } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";
import { Desc, Img } from ".";
import { showToast } from "@/utils/toastify";
import { likeReview } from "@/utils/proxy";
import { useRouter } from "next/navigation";

interface IProps {
  review: IReview;
}

export default function CardReview({ review }: IProps) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleLikeReviewPost = async () => {
    if (!currentUser) {
      showToast("Hãy đăng nhập để sử dụng chức năng này", "error");
      return;
    }

    try {
      await likeReview(review._id, currentUser._id);
      showToast("Thay đổi trạng thái thành công", "success");
      router.refresh();
    } catch (error) {
      showToast("Lỗi trong quá trình xử lý", "error");
    }
  };

  return (
    <div className="shadow-lg bg-white rounded-2xl p-6 hover:shadow-2xl transition-shadow cursor-pointer">
      {/* title */}
      <div className="flex gap-3">
        <Image
          src={
            review?.author?.avatar
              ? `${baseURL}/users/avatar/${review?.author?.avatar}`
              : "/avatar_1.png"
          }
          alt="avatar"
          width={60}
          height={40}
          className="rounded-full object-cover overflow-hidden"
        />
        <div className="grid grid-cols-1 gap-1">
          <h2 className="text-xl font-semibold">{review.author.name}</h2>
          <p className="text-[19px] font-medium">
            <span className="text-txt-second">
              {formatDateTime(review.created_at)}
            </span>{" "}
            - <span className="text-primary">{review.store.name}</span>
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-2">{review.title}</h2>

      {/* rating comment */}
      <div className="flex gap-1 items-center mt-2">
        <div className="text-lg font-semibold">Đánh giá chung :</div>
        <Image src="/star_icon.svg" alt="star_icon" width={20} height={20} />
        <h5 className="font-semibold text-lg text-txt-primary">
          {review.rating.price}
        </h5>
        <span>/ 5 điểm</span>
      </div>
      {/* desc */}
      <Desc>{review.content}</Desc>

      <div className="relative grid grid-cols-5 gap-2 my-4">
        {review.images.slice(0, 5).map((image, index) => (
          <Img
            key={index}
            src={`${baseURL}/reviews/image/${review._id}/${image}`}
          />
        ))}
        {
          <>
            {review.images.length > 5 ? (
              <p className="absolute bg-[#00000070] p-2 text-lg font-medium rounded-full bottom-4 right-4 text-white">
                {review.images.length - 5}
              </p>
            ) : null}
          </>
        }
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-2 items-center" onClick={handleLikeReviewPost}>
          {currentUser && review.favourities.includes(currentUser?._id) ? (
            <Image
              src="/heart_red.svg"
              alt="/heart_red.svg"
              className="group-hover:-translate-y-1 transition-transform"
              width={30}
              height={30}
            />
          ) : (
            <Image
              src="/HEART.svg"
              alt="/HEART.svg"
              className="group-hover:-translate-y-1 transition-transform"
              width={30}
              height={30}
            />
          )}

          <span className="text-lg font-medium">{review.favourities.length}</span>
        </div>
        <Link
          href={`/review/${review._id}`}
          className="rounded-full p-1 hover:shadow-xl group transition-shadow"
        >
          <Image
            src={`/chat.svg`}
            alt="chat icon"
            width={34}
            height={34}
            className="group-hover:-translate-y-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
