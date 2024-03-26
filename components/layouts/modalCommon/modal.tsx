"use client";

import Image from "next/image";

interface IProps {
  isOpen?: boolean;
  children: React.ReactNode;
  commonStyles?: string;
  title?: string;
  handleCloseModal: () => void;
}

export default function Modal({
  title,
  isOpen,
  children,
  commonStyles,
  handleCloseModal
}: IProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-[9999999] ${
        !isOpen && "invisible opacity-0 hidden"
      }`}
    >
      <div
        className="absolute w-full h-full bg-[rgba(23,_23,_23,_0.5)] z-10"
        onClick={handleCloseModal}
      ></div>
      <div
        className={`absolute w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_6px] z-20 bg-white ${commonStyles}`}
      >
        {title ? (
          <div className="relative py-4 border-b-2 text-center">
            <Image
              src="/close_black.svg"
              alt="close_black icon"
              width={30}
              height={30}
              className="absolute top-3 left-3 hover:bg-c-border transition-colors rounded-full p-1 box-content"
              onClick={handleCloseModal}
            />
            <p className="text-2xl text-primary font-semibold">{title}</p>
          </div>
        ) : null}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
