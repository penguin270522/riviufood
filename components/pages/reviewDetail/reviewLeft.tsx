import Image from "next/image";
import Link from "next/link";
import { BtnCommon } from "@/components";
import { CardComment, Desc } from "@/components/commons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalType } from "@/redux/slices/modalSlice";
import { baseURL } from "@/utils/api";
import { formatDateTime } from "@/utils/common";
import { IComment, IReview } from "@/utils/interface";
import { createComment, likeReview } from "@/utils/proxy";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { showToast } from "@/utils/toastify";

interface IProps {
  reviewDetail?: IReview;
  updateComments: (comment: IComment) => void;
}

export default function ReviewLeft({ reviewDetail, updateComments }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentCommen, setContentCommen] = useState<string>("");
  const [indexImgsReview, setIndexImgsReview] = useState(0);

  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const reviewId = params.reviewId as string;

  const totalRating = reviewDetail?.rating
    ? (reviewDetail?.rating.food_safety +
      reviewDetail?.rating.price +
      reviewDetail?.rating.serve +
      reviewDetail?.rating.smell +
      reviewDetail?.rating.space) /
    5
    : 0;

  const handleNextImg = () => {
    if (!reviewDetail?.images) return;
    setIndexImgsReview((pre) =>
      pre + 1 >= reviewDetail?.store?.images.length ? 0 : pre + 1
    );
  };

  const handlePreImg = () => {
    if (!reviewDetail?.images) return;
    setIndexImgsReview((pre) =>
      pre - 1 < 0 ? reviewDetail?.store?.images.length - 1 : pre - 1
    );
  };

  const handleCreateComment = async () => {
    if (!currentUser) {
      showToast("Bạn hãy đăng nhập trước", "error");
      dispatch(setModalType("LOGIN"));
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await createComment(reviewId, {
        author: currentUser?._id,
        content: contentCommen,
      });
      const comment = data.data as IComment;
      updateComments(comment);
      setContentCommen("");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = () => {
    setContentCommen("");
  };

  const handleOnChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContentCommen(e.target.value);
  };

  const handleLikeReviewPost = async () => {
    if (!currentUser) {
      showToast("Hãy đăng nhập để sử dụng chức năng này", "error");
      return;
    }

    if (!reviewDetail) return;

    try {
      await likeReview(reviewDetail?._id, currentUser._id);
      showToast("Thay đổi trạng thái thành công", "success");
      router.refresh();
    } catch (error) {
      showToast("Lỗi trong quá trình xử lý", "error");
    }
  };

  return (
    <div className="w-[67%] bg-white drop-shadow-lg p-10 rounded-xl">
      {/* review detail */}
      <div className="flex gap-5 items-center">
        {/* avatar */}
        <Link
          href={`/user/profile?uid=${reviewDetail?.author?._id}`}
          className="w-[100px] h-[100px] cursor-pointer relative rounded-full overflow-hidden hover:shadow-lg transition-shadow"
        >
          <Image
            src={
              reviewDetail?.author?.avatar
                ? `${baseURL}/users/avatar/${reviewDetail?.author?.avatar}`
                : "/avatar_1.png"
            }
            alt="arrow_left"
            fill
            className="rounded-full object-cover"
          />
        </Link>
        <div>
          <h2 className="text-2xl font-semibold">
            {reviewDetail?.author.name}
          </h2>
          <p className="text-txt-second font-medium text-lg mt-2">
            {reviewDetail?.created_at &&
              formatDateTime(reviewDetail?.created_at)}
            {` tại - `}

            <span className="text-primary text-xl">
              {reviewDetail?.store?.name}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center w-full relative py-6">
        {/* arrow left */}
        <div
          className="absolute bg-slate-400 top-1/2 left-[5%] flex items-center justify-center"
          onClick={handlePreImg}
        >
          <Image
            src="/arrow_bottom.svg"
            alt="arrow_left"
            width={30}
            height={30}
          />
        </div>
        {/* ảnh store */}
        <div className="w-[60%] aspect-[1/1.3] relative">
          <Image
            src={`${baseURL}/stores/image/${reviewDetail?.store?._id}/${reviewDetail?.store?.images[indexImgsReview]}`}
            alt="banner "
            fill
            className="object-contain"
          />
        </div>
        {/* arrow right */}
        <div
          className="absolute bg-slate-400 top-1/2 right-[5%] flex items-center justify-center"
          onClick={handleNextImg}
        >
          <Image
            src="/arrow_bottom.svg"
            alt="arrow_left"
            width={30}
            height={30}
          />
        </div>

        {/* total viewer */}
        <div className="flex gap-2 absolute left-[5%] bottom-0 py-2 px-4 bg-[#4c4c4c] rounded-xl">
          <Image src="/eye.svg" alt="eye" width={24} height={24} />
          <span className="text-white font-medium">3k</span>
        </div>
        {/* total image */}
        <div className="absolute right-[5%] bottom-0 py-2 px-4 bg-[#4c4c4c] rounded-xl">
          <span className="text-white font-medium">
            {indexImgsReview + 1}/{reviewDetail?.store?.images.length}
          </span>
        </div>
      </div>
      {/* review content */}
      <div className="py-4 mt-6 border-t">
        <div className="flex items-center gap-2">
          {/* rating */}
          <Image src="/star_icon.svg" alt="arrow_left" width={30} height={30} />
          <p className="text-xl font-medium">{totalRating}</p>/
          <span>5.0 điểm</span>
        </div>

        {/* title */}
        <h4 className="text-3xl font-bold my-3">{reviewDetail?.title}</h4>
        <Desc>{reviewDetail?.content}</Desc>
      </div>

      {/* link to store */}
      <Link href={`/store/${reviewDetail?.store?._id}`} className="py-6">
        <div className="flex gap-4 border rounded-xl p-6 hover:shadow-xl transition-shadow relative">
          {/* banner store */}
          <div className="w-[10%] aspect-[1/1] relative">
            <Image
              src={`${baseURL}/stores/image/${reviewDetail?.store?._id}/${reviewDetail?.store?.images[0]}`}
              alt="banner"
              fill
              className="object-cover"
            />
          </div>
          {/* store detail */}
          <div>
            <h4 className="text-2xl font-semibold hover:text-primary transition-colors line-clamp-1">
              {reviewDetail?.store?.name}
            </h4>
            <p className="text-lg text-txt-second line-clamp-1">
              {reviewDetail?.store?.address}
            </p>
            <div className="flex items-center gap-2">
              {/* rating */}
              <Image
                src="/star_icon.svg"
                alt="arrow_left"
                width={30}
                height={30}
              />
              <p className="text-xl font-medium">4.5</p>
              <span className="text-lg font-medium text-txt-second">
                ( {reviewDetail?.comments.length} riviu )
              </span>
            </div>
          </div>

          {/* icon edit store */}
          <div className="absolute top-[7%] right-[2%] grid place-items-center p-2 bg-[#f0f2f4] rounded-full shadow-md">
            <Image
              src="/edit_comment.svg"
              alt="arrow_left"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        </div>
      </Link>

      {/* comments */}
      {/* heading */}
      <div className="flex justify-between items-center py-6">
        {/* left */}
        <div className="flex gap-2">
          {currentUser &&
            reviewDetail?.favourities.includes(currentUser?._id) ? (
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
          <span className="text-lg">
            {reviewDetail?.favourities.length} người yêu thích
          </span>
        </div>
        {/* right */}
        <p className="text-lg font-semibold">
          {reviewDetail?.comments.length} Bình luận
        </p>
      </div>

      {/* input comment */}
      <div className="flex gap-6">
        <div className="w-12 h-12 relative">
          <Image
            src={
              currentUser?.avatar
                ? `${baseURL}/users/avatar/${currentUser?.avatar}`
                : "/avatar_1.png"
            }
            alt="banner"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <textarea
          cols={12}
          placeholder="Nhập bình luận"
          value={contentCommen}
          onChange={handleOnChangeInput}
          className="outline-none resize-none overflow-hidden flex-1 p-3 text-xl bg-[#f4f5f8] rounded-xl"
        ></textarea>
      </div>

      {/* btn comment */}
      {contentCommen ? (
        <div className="flex justify-end mt-4">
          <BtnCommon
            title={isLoading ? "Đang xử lý" : "Bình luận"}
            commonStyles=""
            handleClick={handleCreateComment}
            disabled={isLoading}
          />
          <div className={`h-[60px] p-1 rounded-xl`}>
            <div
              className={`rounded-xl shadow-lg flex item-center justify-center px-4 py-3 bg-[#f7f7f7] text-black font-semibold text-lg min-w-[120px] cursor-pointer`}
              onClick={handleDeleteComment}
            >
              Huỷ
            </div>
          </div>
        </div>
      ) : null}

      {/* list comments */}
      <div className="py-6">
        <div className="grid grid-cols-1 gap-10">
          {reviewDetail?.comments.length ? (
            reviewDetail?.comments.map((comment, ind) => (
              <CardComment comment={comment} key={ind} />
            ))
          ) : (
            <div className="text-center w-full mt-8 text-xl font-medium">
              Hãy là người bình luận đầu tiên.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
