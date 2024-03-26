"use client";

interface IProps {
  title: string;
  commonStyles: string;
  btnStyles?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

export default function BtnCommon({
  title,
  commonStyles,
  btnStyles,
  handleClick,
  disabled = false,
}: IProps) {
  return (
    <div
      className={`bg-[#ff9d9d29] h-[60px] p-1 rounded-xl ${commonStyles}`}
      onClick={() => !disabled && handleClick && handleClick()}
    >
      <div
        className={`rounded-xl flex item-center justify-center px-4 py-3 bg-btn text-white font-semibold text-lg min-w-[120px] cursor-pointer ${btnStyles}`}
      >
        {title}
      </div>
    </div>
  );
}
