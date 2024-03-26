"use client";

import LoadingScreen from "@/components/commons/loading";
import { UserReviews, UserStores } from "@/components/pages/user";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalType } from "@/redux/slices/modalSlice";
import { baseURL } from "@/utils/api";
import { IUser } from "@/utils/interface";
import { getUserById } from "@/utils/proxy";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ITag {
  key: TAG;
  name: string;
}

const tags: ITag[] = [
  { key: "post", name: "Bài viết" },
  { key: "collection", name: "Bộ sưu tập" },
  { key: "image/video", name: "Ảnh/video" },
  { key: "location", name: "Địa điểm" },
];

type TAG = "post" | "location" | "image/video" | "collection";

export default function Profile() {
  const [tagFilter, setTagFilter] = useState<TAG>("post");
  const [guestUser, setGuestUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");

  const selectedUser = userId ? guestUser : currentUser;

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await getUserById(userId!);
        setGuestUser(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) getUser();
  }, [currentUser?.avatar, currentUser?._id, userId]);

  const handleChangeTag = (tagKey: TAG) => {
    setTagFilter(tagKey);
  };

  const renderList: Record<TAG, React.ReactNode> = {
    post: <UserReviews />,
    location: <UserStores />,
    "image/video": <>Chưa có ảnh</>,
    collection: <>Chưa có bộ sưu tập nào</>,
  };

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}

      <div className="py-10 px-px-body">
        <div className="p-[80px] bg-white shadow-xl rounded-xl">
          {/* user infor */}
          <div className="flex item-center gap-8">
            {/* avatar */}
            <div className="relative w-[200px] h-[200px] shadow-md rounded-full">
              <Image
                src={
                  selectedUser?.avatar
                    ? `${baseURL}/users/avatar/${selectedUser?.avatar}`
                    : "/avatar_1.png"
                }
                alt="avatar"
                fill
                className="rounded-full object-cover"
              />

              <div
                className="block absolute bottom-0 left-0 rounded-xl bg-[#6c757d] z-10 font-medium cursor-pointer text-white p-2 hover:opacity-90 transition-all"
                onClick={() => dispatch(setModalType("UPDATE_AVATAR"))}
              >
                Chỉnh sửa
              </div>
            </div>
            {/* username */}
            <div className="flex flex-col justify-center gap-2">
              <h4 className="text-2xl text-txt-primary font-semibold">
                {selectedUser?.name}
              </h4>
              <p className="text-lg text-txt-second font-medium">
                {selectedUser?.email}
              </p>
            </div>
          </div>

          {/* kiệt kê */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4 mt-6 mb-3 items-center">
              <div className="text-lg">
                <span className="font-medium text-xl">1</span> bài viết
              </div>
              <div className="text-lg">
                <span className="font-medium text-xl">0</span> người theo dõi
              </div>
              <div className="text-lg">
                <span className="font-medium text-xl">0</span> đang theo dõi
              </div>
            </div>

            <div className="text-lg font-medium flex gap-2 items-center">
              Xem nhiều bài du lịch, ăn uống tại Riviu.vn của{" "}
              <span className="text-xl font-semibold text-primary">
                {selectedUser?.name}
              </span>{" "}
              nhé...
              <Image src="/heart_red.svg" alt="heart" width={24} height={24} />
            </div>
          </div>

          {/* tags */}
          <div className="py-4 mt-6 flex justify-center items-center gap-12">
            {tags.map((tag) => (
              <div
                key={tag.key}
                className={`text-2xl hover:text-txt-primary cursor-pointer ${
                  tag.key === tagFilter
                    ? "text-txt-primary font-semibold"
                    : "text-txt-second font-medium"
                }`}
                onClick={() => handleChangeTag(tag.key)}
              >
                {tag.name}
              </div>
            ))}
          </div>

          {/* list by tag filter */}
          <div>{renderList[tagFilter]}</div>
        </div>
      </div>
    </>
  );
}
