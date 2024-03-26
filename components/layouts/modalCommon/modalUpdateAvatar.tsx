"use client";

import { BtnCommon } from "@/components";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType, setModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { uploadAvatar } from "@/utils/proxy";
import { useRouter } from "next/navigation";
import { setUserMe } from "@/redux/slices/authSlice";
import { showToast } from "@/utils/toastify";

export default function ModalUpdateAvatar() {
  const [avatar, setAvatar] = useState<any | null>(null);
  const [blob, setBlob] = useState<string | null>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { typeModal } = useAppSelector((state) => state.modal);
  const { currentUser } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // xử lý người dùng đăng nhập
  const handleUpdateAvatar = async () => {
    if (!currentUser) {
      showToast("Bạn hãy đăng nhập trước", "error");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatar);
      const { data } = await uploadAvatar(currentUser._id, formData);

      dispatch(setUserMe({ ...currentUser, avatar: data.data }));
      dispatch(removeModalType());
    } catch (error) {
      showToast("Cập nhật avatar thất bại", "error");
      console.log("error : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatar(e?.target?.files?.[0]);
    e?.target?.files?.[0] &&
      setBlob(URL.createObjectURL(e?.target?.files?.[0]));
  };

  const handleCancelModal = (action: "cancel" | "exit") => {
    if (action === "cancel") {
      blob && URL.revokeObjectURL(blob);
      setAvatar(null);
      setBlob(null);
    } else {
      dispatch(setModalType(null));
    }
  };

  return (
    <Modal
      isOpen={typeModal === "UPDATE_AVATAR" ? true : false}
      handleCloseModal={() => dispatch(removeModalType())}
      commonStyles="max-w-[700px]"
      title="Chỉnh sửa ảnh đại diện"
    >
      <div className="h-[40vh] flex flex-col items-center">
        {blob ? (
          <div className="w-[80%] h-[60%] relative">
            <Image
              src={blob}
              alt="avatar blob"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <>
            <label
              htmlFor="avatar"
              className="bg-[#0000000d] cursor-pointer border border-dashed p-9 flex gap-4 items-center justify-center flex-col"
            >
              <Image src="/upload.svg" width={60} height={60} alt="upload" />
              <p className="text-[#6c757d] font-medium text-lg">
                Chọn ảnh để cập nhật avatar
              </p>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="hidden"
              onChange={handleImageChange}
            />
          </>
        )}

        <div className="w-full mt-auto text-right cursor-pointer flex gap-3 justify-end">
          <div
            className="p-3 font-semibold rounded-xl text-xl text-primary hover:bg-slate-400"
            onClick={() => handleCancelModal(avatar ? "cancel" : "exit")}
          >
            {avatar ? "Huỷ" : "Thoát"}
          </div>
          {avatar ? (
            <BtnCommon
              title={isLoading ? "Đang xử lý" : "Cập nhật"}
              commonStyles=""
              handleClick={handleUpdateAvatar}
              disabled={isLoading}
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
