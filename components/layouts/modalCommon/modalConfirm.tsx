"use client";

import { BtnCommon } from "@/components";
import Modal from "./modal";

interface IProps {
  isOpen: boolean;
  disabled: boolean;
  title: string;
  handleOnAccept: () => void;
  handleCloseModal: () => void;
}

export default function ModalConfirm({
  isOpen = false,
  handleCloseModal,
  handleOnAccept,
  disabled = false,
  title
}: IProps) {
  return (
    <Modal
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      commonStyles="max-w-[400px]"
    >
      <div className="flex justify-center flex-col items-center">
        <h2 className="text-2xl text-txt-primary font-semibold mb-6">
          {title}
        </h2>
        <div className="flex gap-6">
          <BtnCommon
            title="Huỷ bỏ"
            commonStyles=""
            handleClick={handleCloseModal}
            disabled={disabled}
          />
          <BtnCommon
            title="Xác nhận"
            commonStyles=""
            handleClick={handleOnAccept}
            disabled={disabled}
          />
        </div>
      </div>
    </Modal>
  );
}
