"use client";

import Image from "next/image";
import { BtnCommon, UserHeader } from "..";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalType } from "@/redux/slices/modalSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/proxy";
import { setUserMe } from "@/redux/slices/authSlice";
import Link from "next/link";

export default function Header() {
  const { currentUser, access_token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (access_token && !currentUser?._id) {
      const getUser = async () => {
        try {
          const { data } = await getCurrentUser();
          dispatch(setUserMe(data.data));
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [access_token]);

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

          {currentUser?._id ? (
            <>
              {/* <BtnCommon
                title="Viết Riviu"
                commonStyles=""
                handleClick={() => router.push("/review")}
              /> */}
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
