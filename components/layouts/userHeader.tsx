import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUserLogOut } from "@/redux/slices/authSlice";
import { baseURL } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

const dropDownUser = [
  "Thông tin tài khoản",
  "Địa điểm đã lưu",
  "Bài viết đã lưu",
  "Đăng xuất",
];

export default function UserHeader() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.auth);

  const handleItemClick = (key: string) => {
    if (key === "Đăng xuất") {
      dispatch(currentUserLogOut());
    } else if (key === "Thông tin tài khoản") {
      router.push("/user/profile");
    }
  };

  return (
    <div className="relative group">
      <div className="h-[50px] relative w-[50px] overflow-hidden rounded-full shadow-lg cursor-pointer">
        <Image
          src={
            currentUser?.avatar
              ? `${baseURL}/users/avatar/${currentUser?.avatar}`
              : "/avatar_1.png"
          }
          alt="avatar"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute shadow-md z-10 w-[250px] rounded-lg top-full left-0 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ">
        {dropDownUser.map((item) => (
          <div
            className="py-2 px-5 flex items-center cursor-pointer transition-all hover:text-second"
            key={item}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
