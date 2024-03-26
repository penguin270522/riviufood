"use client";

import LoadingScreen from "@/components/commons/loading";
import ModalConfirm from "@/components/layouts/modalCommon/modalConfirm";
import { useAppSelector } from "@/redux/hooks";
import { baseURL } from "@/utils/api";
import { IReview } from "@/utils/interface";
import { deleteReviewById, getUserById, getUserReviews } from "@/utils/proxy";
import { showToast } from "@/utils/toastify";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

export default function UserReviews() {
  const [userReviews, setUserReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const searchParams = useSearchParams();
  const userId = searchParams.get("uid") ?? currentUser?._id;

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await getUserReviews(userId!);
        setUserReviews(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) getUser();
  }, [userId]);

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      {userReviews.length ? (
        <div className="grid grid-cols-4 gap-8">
          {userReviews.map((review, ind) => (
            <Card key={ind} review={review} />
          ))}
        </div>
      ) : (
        <div className="w-full text-center text-2xl font-semibold mt-8">
          Chưa có bài riviu nào .{" "}
        </div>
      )}
    </>
  );
}

interface ICard {
  review: IReview;
}

function Card({ review }: ICard) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteReviewById(review._id);
      showToast("Xoá thành công");
    } catch (error) {
      showToast("Không thể xoá", "error");
    } finally {
      setIsLoading(false);
      handleClosePopup();
    }
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Link
        href={`/review/${review._id}`}
        className="relative border rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="h-[350px] relative">
          <Image
            src={`${baseURL}/reviews/image/${review._id}/${review.images[0]}`}
            alt="post"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3">
          <h2 className="line-clamp-1 text-xl font-medium">{review.title}</h2>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2 items-center">
              <Image
                src="/avatar_1.png"
                alt="avatar"
                className="rounded-full"
                width={30}
                height={30}
              />
              <p className="text-txt-second font-medium line-clamp-1">
                {review.author.name}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/comment.svg"
                alt="comment icon"
                width={24}
                height={24}
              />
              <p className="text-txt-second font-medium">
                {review.comments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 rounded-full p-4 transition-all bg-[#f0f2f4] hover:bg-slate-400 group">
          <Image src="/more.svg" alt="more icon" width={24} height={24} />

          <div className="relative">
            <div className="absolute rounded-xl w-[150px] top-full right-0 bg-white p-2 shadow-2xl scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <div
                className="flex items-center gap-4 p-3 hover:bg-red-500 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenPopup();
                }}
              >
                <Image src="/trash.svg" alt="trash" width={24} height={24} />
                <span className="text-lg font-medium">delete</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <ModalConfirm
        title="Xác nhận xoá bài viết này"
        disabled={isLoading}
        handleCloseModal={handleClosePopup}
        handleOnAccept={handleDelete}
        isOpen={isOpen}
      />
    </>
  );
}
