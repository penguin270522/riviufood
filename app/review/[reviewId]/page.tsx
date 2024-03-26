"use client";

import Image from "next/image";
import Link from "next/link";
import { BtnCommon } from "@/components";
import CardComment from "@/components/commons/cardComment";
import LoadingScreen from "@/components/commons/loading";
import { ReviewLeft, ReviewRight } from "@/components/pages/reviewDetail";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalType } from "@/redux/slices/modalSlice";
import { baseURL } from "@/utils/api";
import { formatDateTime } from "@/utils/common";
import { IComment, IReview } from "@/utils/interface";
import { createComment, getReviewById } from "@/utils/proxy";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function ReviewDetail() {
  const [reviewDetail, setReviewDetail] = useState<IReview>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams();
  const reviewId = params.reviewId as string;

  useEffect(() => {
    const getReviewDetail = async () => {
      setIsLoading(true);
      try {
        const { data } = await getReviewById(reviewId);
        setReviewDetail(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getReviewDetail();
  }, []);

  const updateComments = (comment: IComment) => {
    setReviewDetail((prev: any) => {
      const newComments = prev?.comments ? [comment, ...prev.comments] : [];
      return { ...prev, comments: newComments };
    });
  };

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}

      <div className="px-px-body flex py-8 gap-6">
        <ReviewLeft
          reviewDetail={reviewDetail}
          updateComments={updateComments}
        />

        {/* advertise right */}
        <ReviewRight reviewDetail={reviewDetail} />
      </div>
    </>
  );
}
