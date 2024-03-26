"use client";

import Image from "next/image";
import { useState } from "react";

interface IProps {
  commonStyles?: string;
  stylesStar?: string;
  isEdit?: boolean;
  rating: number;
  handleOnChangeRating?: (rating: number) => void;
}

export default function StarRatings({
  commonStyles = "gap-2",
  stylesStar = "w-10 h-10",
  isEdit = false,
  rating = 1,
  handleOnChangeRating,
}: IProps) {
  const [indexHoverStar, setIndexHoverStar] = useState<number | null>(null);

  return (
    <div className={`flex items-center ${commonStyles}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <label className="flex_center">
          <input
            type="radio"
            name="rating"
            className="hidden"
            value={index + 1}
            onClick={() =>
              isEdit && handleOnChangeRating && handleOnChangeRating(index + 1)
            }
          />

          <div
            className={`w-10 h-10 relative flex_center cursor-pointer ${stylesStar}`}
            onMouseEnter={() => isEdit && setIndexHoverStar(index + 1)}
            onMouseLeave={() => isEdit && setIndexHoverStar(null)}
          >
            {index + 1 <= (indexHoverStar ?? rating) ? (
              <Image src="/star_red.svg" alt="star icon" fill />
            ) : (
              <Image src="/star_grey.svg" alt="star icon" fill />
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
