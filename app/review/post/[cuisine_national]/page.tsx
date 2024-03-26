"use client";

import { BtnCommon } from "@/components";
import { Img } from "@/components/commons";
import Desc from "@/components/commons/desc";
import LoadingScreen from "@/components/commons/loading";
import { useAppSelector } from "@/redux/hooks";
import { baseURL } from "@/utils/api";
import {
  clearAllSearchParams,
  formatDateTime,
  updateSearchParams,
} from "@/utils/common";
import { CUISINE_NATIONAL_FOOD } from "@/utils/data";
import { IReviewCuisine } from "@/utils/interface";
import { getReviewsByNational, likeReview } from "@/utils/proxy";
import { showToast } from "@/utils/toastify";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewsCuisineNational() {
  const [reviews, setReviews] = useState<IReviewCuisine[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const params = useParams();
  const cuisine_national = params.cuisine_national as string;
  const searchParams = useSearchParams();
  const rating = searchParams.get("rating");

  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);
      try {
        const { data } = await getReviewsByNational(
          cuisine_national,
          rating || ""
        );
        setReviews(data.data);
      } catch (error) {
        showToast("Lỗi", "error");
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [rating]);

  const handleChangeSearchParams = (key: string, value: string) => {
    const params = updateSearchParams(key, value);
    router.replace(params, { scroll: false });
  };

  const handleUpdateListRevew = (userId: string, reviewId: string) => {
    const review = reviews.find((review) => review._id === reviewId);

    const currentUserIsLike = review?.favourities.includes(userId);

    let newFavourities: string[] = [];

    if (currentUserIsLike && review) {
      newFavourities = review?.favourities.filter(
        (userIdFavourite) => userIdFavourite !== userId
      );
    } else {
      newFavourities.push(userId);
    }

    const updatedReviews = reviews.map((review) => {
      if (review._id === reviewId) review.favourities = newFavourities;
      return review;
    });

    setReviews(updatedReviews);
  };

  const handleLikeReviewPost = async (reviewId: string) => {
    if (!currentUser) {
      showToast("Hãy đăng nhập để sử dụng chức năng này", "error");
      return;
    }

    handleUpdateListRevew(currentUser._id, reviewId);
    try {
      await likeReview(reviewId, currentUser._id);
    } catch (error) {
      showToast("Lỗi trong quá trình xử lý", "error");
    }
  };

  const handleClearSearchParams = () => {
    const params = clearAllSearchParams();
    router.replace(params, { scroll: false });
  };

  const cuisineNationalName = CUISINE_NATIONAL_FOOD.find(
    (cuisine) => cuisine.key === cuisine_national
  )?.label;

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}

      <div className="w-full max-w-[1000px] mx-auto my-6 ">
        {/* img */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="aspect-[2/1] w-full relative">
            <Image src={"/banner-main.png"} alt="" fill />
          </div>

          {/* detail */}
          <div className="flex flex-col justify-center items-center gap-2 p-6 w-full">
            <div className="flex gap-2">
              <span className="text-xl font-medium">
                {reviews.length} bài viết
              </span>
              {" - "}
              <span className="text-xl font-medium">0 địa điểm</span>
            </div>
            <h3 className="text-3xl text-txt-primary font-semibold my-3">
              {cuisineNationalName}
            </h3>
            <p className="text-xl">
              Xem ngay cộng đồng Riviu.vn ✅, thật tiếc nếu bỏ qua{" "}
              {cuisineNationalName}
            </p>
          </div>
        </div>

        {/* list */}
        <div className="flex gap-4 my-6">
          <div className="w-[30%]">
            {/* filter */}
            <div className="sticky top-10">
              <div className="bg-white p-4 1-lg rounded-xl">
                <h3 className="text-txt-second text-xl font-bold pb-3">
                  Đánh giá
                </h3>
                <div className="border-t pt-3 grid grid-cols-3 gap-4">
                  {Array.from({ length: 5 }).map((_, ind) => (
                    <div
                      className={`px-4 py-2 flex items-center gap-2 border rounded-xl cursor-pointer transition-all ${
                        rating &&
                        !isNaN(+rating) &&
                        ind + 1 === +rating &&
                        "bg-primary text-white"
                      }`}
                      key={ind}
                      onClick={() =>
                        handleChangeSearchParams("rating", `${ind + 1}`)
                      }
                    >
                      <span className="text-inherit text-xl">{ind + 1}</span>
                      <Image
                        src="/star_red.svg"
                        alt="star"
                        width={24}
                        height={24}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* btn reset */}
              <div className="mt-6">
                <BtnCommon
                  title="Đặt lại bộ tìm kiếm"
                  handleClick={handleClearSearchParams}
                  commonStyles=""
                />
              </div>
            </div>
          </div>

          {/* w-75 */}
          <div className="w-[70%]">
            <div className="grid grid-cols-1 gap-6">
              {/* card */}
              {reviews.length ? (
                reviews.map((review, ind) => (
                  <Card
                    handleLikeReviewPost={handleLikeReviewPost}
                    review={review}
                    key={ind}
                  />
                ))
              ) : (
                <div className="text-center pt-8 text-xl text-txt-primary font-semibold">
                  Chưa có bài viết vào ở đây
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface ICard {
  review: IReviewCuisine;
  handleLikeReviewPost: (reviewId: string) => void;
}

function Card({ review, handleLikeReviewPost }: ICard) {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      {/* heading */}
      <div className="flex gap-4 items-center">
        <Link href={`/user/${review.author._id}`}>
          <Image
            src={
              review?.author?.avatar
                ? `${baseURL}/users/avatar/${review?.author?.avatar}`
                : "/avatar_1.png"
            }
            alt=""
            className="rounded-full"
            width={80}
            height={80}
          />
        </Link>
        <div className="">
          <h4 className="text-xl font-semibold">{review.author.name}</h4>
          <p className="text-lg text-txt-second font-medium">
            {formatDateTime(review.created_at)}
          </p>
        </div>
      </div>

      {/* body */}
      <h4 className="my-3 text-2xl font-semibold text-primary">
        {review.title}
      </h4>
      <Desc>{review.content}</Desc>

      {/* images */}
      <div className="my-4 grid grid-cols-8 gap-2">
        {review.images.slice(0, 8).map((img, ind) => (
          <Img
            key={ind}
            src={`${baseURL}/reviews/image/${review._id}/${img}`}
          />
        ))}
      </div>

      <Link
        href={`/store/${review.store._id}`}
        className="block text-xl font-semibold text-primary py-4 hover:underline cursor-pointer"
      >
        # {review.store.name}
      </Link>

      {/* actions */}
      <div className="flex pt-4 gap-6 border-t">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleLikeReviewPost(review._id)}
        >
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

          <span className="text-xl font-medium">
            {review.favourities.length}
          </span>
        </div>

        <Link
          href={`/review/${review._id}`}
          className="group flex items-center cursor-pointer"
        >
          <Image
            src="/chat.svg"
            alt="/chat.svg"
            className="group-hover:-translate-y-1 transition-transform"
            width={30}
            height={30}
          />
        </Link>
        <span className="text-xl font-medium">{review.comments.length}</span>
      </div>
    </div>
  );
}
