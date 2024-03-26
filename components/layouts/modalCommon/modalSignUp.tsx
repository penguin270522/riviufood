"use client";

import { BtnCommon } from "@/components";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType, setModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { useState } from "react";
import { userSignUpApi } from "@/utils/proxy";
import { showToast } from "@/utils/toastify";

export default function ModalSignUp() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { typeModal } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  // từ trang đăng ký chuyển qua trang login khi có tài khoản
  const handleClickLogin = () => {
    dispatch(setModalType("LOGIN"));
  };

  //   Đăng ký tài khoản
  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const { email, password, name } = userLogin;
      if (!email || !password || !name) {
        showToast("Hãy nhập đầy đủ thông để đăng nhập", "error");
        return;
      }

      await userSignUpApi(email, password, name);

      dispatch(setModalType("LOGIN"));
      showToast("Thành công");
    } catch (error) {
      console.log("error : ", error);
      showToast("thất bại", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // lưu giá trị được nhập vào userLogin
  const handleOnchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal
      isOpen={typeModal === "SIGN_UP" ? true : false}
      handleCloseModal={() => dispatch(removeModalType())}
      commonStyles="max-w-[1000px]"
    >
      <div className="h-[86vh]">
        <div className="flex h-full">
          <div className="w-1/2 relative">
            <Image
              src="/backgroud_login.svg"
              alt="login banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-1/2 h-full">
            <div className="px-14 flex flex-col items-center justify-center gap-4 h-full">
              <h2 className="text-5xl mb-5 text-[#696c72] font-semibold w-full text-left">
                Đăng ký
              </h2>

              <div className="w-full h-[48px]">
                <input
                  type="text"
                  name="email"
                  placeholder="Nhập email"
                  className="outline-none bg-input p-4 text-lg w-full h-full rounded-xl"
                  onChange={handleOnchangeInput}
                />
              </div>

              <div className="w-full h-[48px]">
                <input
                  type="text"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  className="outline-none bg-input p-4 text-lg w-full h-full rounded-xl"
                  onChange={handleOnchangeInput}
                />
              </div>

              <div className="w-full h-[48px]">
                <input
                  type="text"
                  name="name"
                  placeholder="Tên hiển thị"
                  className="outline-none bg-input p-4 text-lg w-full h-full rounded-xl"
                  onChange={handleOnchangeInput}
                />
              </div>

              {/* btn quên mật khẩu */}
              <div className="text-right w-full">
                <span className="text-txt-second text-lg font-medium cursor-pointer">
                  Quên mật khẩu
                </span>
              </div>

              <BtnCommon
                title={isLoading ? "Đang xử lý..." : "Đăng ký"}
                commonStyles="w-full"
                disabled={isLoading}
                handleClick={handleSignUp}
              />

              <div className="flex gap-2 w-full">
                <span className="flex-1 border-t border-[#a8aaaf] translate-y-[50%]"></span>
                <span className="w-12 text-txt-second text-lg font-medium">
                  hoặc
                </span>
                <span className="flex-1 border-t border-[#a8aaaf] translate-y-[50%]"></span>
              </div>

              {/* login social */}

              <div className="flex gap-4 w-full">
                <div className="w-1/2 p-6 border flex justify-center rounded-2xl border-[#f0f2f4]">
                  <Image src="/fb.svg" alt="" width={48} height={48} />
                </div>
                <div className="w-1/2 p-6 border flex justify-center rounded-2xl border-[#f0f2f4]">
                  <Image src="/gg.svg" alt="" width={48} height={48} />
                </div>
              </div>

              {/* btn sign up */}
              <div
                className="text-center w-full text-primary text-xl cursor-pointer font-semibold mt-5"
                onClick={handleClickLogin}
              >
                Đăng nhập
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
