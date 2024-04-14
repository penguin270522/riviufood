"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserMe } from "@/redux/slices/authSlice";
import { setModalType } from "@/redux/slices/modalSlice";
import { getCurrentUser } from "@/utils/proxy";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BtnCommon, UserHeader } from "..";

export default function Header() {
  const router = useRouter();
  const { currentUser, access_token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (access_token && !currentUser) {
      const getUser = async () => {
        try {
          const userData = await getCurrentUser(access_token);
          if (userData) {
            dispatch(setUserMe(userData));
          } else {
            console.log("Không tìm thấy thông tin người dùng.");
          }
        } catch (error) {
          console.log("Lỗi khi gửi yêu cầu lấy thông tin người dùng:", error);
        }
      };
      getUser();
    }
  }, [access_token, currentUser]);
  //console.log(currentUser);
  const handleOpenModalSearch = () => {
    dispatch(setModalType("SEARCH_STORE"));
  };

  return (
    <div className="px-px-header">
      <div className="flex items-center h-[110px] justify-between">
        <Link
          href={"/"}
          prefetch={false}
          className="relative w-[120px] h-[80px]"
        >
          <Image src="/logo.png" alt="logo" fill className="object-contain" />
        </Link>

        <div className="flex gap-5 h-[50px]">
          {/* input search */}
          <div
            className="relative mr-[60px] w-[300px] h-[60px] px-4 flex items-center gap-3 bg-[#f4f5f8] rounded-3xl hover:shadow-lg transition-all"
            onClick={handleOpenModalSearch}
          >
            <Image
              src="/search_grey.svg"
              alt="search_grey"
              width={24}
              height={24}
            />
            <div className="p-2 flex-1">
              <input
                type="text"
                className="bg-transparent p-2 h-full outline-none w-full text-lg"
                placeholder="Tìm kiếm địa điểm rì viu."
              />
            </div>
          </div>

          {currentUser ? (
            <>
              {
                <BtnCommon
                  title="Viết Riviu"
                  commonStyles=""
                  handleClick={() => router.push("/review")}
                />
              }
              <BtnCommon
                title="Thêm Địa Điểm"
                commonStyles=""
                handleClick={() => dispatch(setModalType("CREATE_STORE"))}
              />
              <UserHeader />
            </>
          ) : (
            <BtnCommon
              title="Đăng nhập"
              commonStyles=""
              handleClick={() => dispatch(setModalType("LOGIN"))}
            />
          )}

          {/* btn */}
          <BtnCommon title="Liên hệ" commonStyles="" />
        </div>
      </div>
    </div>
  );
}
