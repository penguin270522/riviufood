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

export default function ModalImages() {
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
        showToast("Hãy nhập đầy đủ thông để đăng nhập", "error");
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
      showToast("thất bại");
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
     123
    </Modal>
  );
}
