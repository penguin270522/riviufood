import Image from "next/image";

interface IProps {
  src?: string;
  handleClick?: () => void;
}

export default function Img({ src = "/banner-main.png", handleClick }: IProps) {
  return (
    <div
      className="aspect-[1/1] rounded-xl overflow-hidden relative cursor-pointer shadow-md"
      onClick={handleClick}
    >
      <Image
        src={src}
        alt={src}
        fill
        className="object-cover transition-all hover:scale-105 hover:shadow-lg"
      />
    </div>
  );
}
