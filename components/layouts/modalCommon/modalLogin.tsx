"use client";

import { BtnCommon } from "@/components";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType, setModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { useState } from "react";
import { userLogin as userLoginApi } from "@/utils/proxy";
import { setCurrentUserLogin } from "@/redux/slices/authSlice";
import { saveAuthToken } from "@/utils/api";
import { showToast } from "@/utils/toastify";

export default function ModalLogin() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { typeModal } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  // từ trang đăng nhập chuyển qua trang đăng ký khi không có tài khoản
  const handleClickSignUp = () => {
    dispatch(setModalType("SIGN_UP"));
  };

  // xử lý người dùng đăng nhập
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { email, password } = userLogin;
      if (!email || !password) {
        showToast("Hãy nhập đầy đủ thông để đăng nhập");
        return;
      }
      const { data } = await userLoginApi(email, password);

      dispatch(
        setCurrentUserLogin({
          access_token: data.token,
          user: data.user,
        })
      );
      saveAuthToken(data.token);

      dispatch(removeModalType());
      showToast("Thành công");
    } catch (error) {
      console.log("error : ", error);
      showToast("Hãy kiểm tra lại email và mật khẩu");
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
      isOpen={typeModal === "LOGIN" ? true : false}
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
                Đăng nhập
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

              {/* btn quên mật khẩu */}
              <div className="text-right w-full">
                <span className="text-txt-second text-lg font-medium cursor-pointer">
                  Quên mật khẩu
                </span>
              </div>

              <BtnCommon
                title={isLoading ? "Đang xử lý..." : "Đăng nhập"}
                commonStyles="w-full"
                disabled={isLoading}
                handleClick={handleLogin}
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
                onClick={handleClickSignUp}
              >
                Tạo tài khoản
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
