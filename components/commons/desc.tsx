"use client";

import { useEffect, useRef, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

export default function Desc({ children }: IProps) {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  
  useEffect(() => {
    if (ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      if (clientHeight >= scrollHeight) setIsShowAll(true);
    }
  }, []);

  const ref = useRef<HTMLParagraphElement | null>(null);
  return (
    <>
      <p ref={ref} className={`text-xl ${!isShowAll && "line-clamp-4"}`}>
        {children}
      </p>{" "}
      {!isShowAll ? (
        <span
          className="text-lg font-semibold hover:text-txt-primary transition-all cursor-pointer"
          onClick={() => setIsShowAll(true)}
        >
          Xem thêm
        </span>
      ) : null}
    </>
  );
}
