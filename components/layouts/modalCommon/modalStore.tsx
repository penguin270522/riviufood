"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "./modal";
import { removeModalType, setModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { BtnCommon } from "@/components";
import { ChangeEvent, useEffect, useState } from "react";
import { ICreateStore } from "@/utils/interface";
import { generateTimeOptions } from "@/utils/common";
import { axiosAuthCookieMultiData } from "@/utils/api";
import { uploadImagesStore } from "@/utils/proxy";
import { useRouter } from "next/navigation";
import { CUISINE_NATIONAL_FOOD, DISTRICTS } from "@/utils/data";
import { showToast } from "@/utils/toastify";

interface IProvice {
  code: string;
  name: string;
  name_with_type: string;
  slug: string;
  type: string;
}

export default function ModalStore() {
  const { typeModal } = useAppSelector((state) => state.modal);
  const [provinces, setProvinces] = useState<IProvice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgsBlob, setImgsBlob] = useState<string[]>([]);

  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [storeData, setStoreData] = useState<ICreateStore>({
    name: "",
    slogan: "",
    cuisine_national: "",
    open_time: "08:00",
    close_time: "08:00",
    address: "",
    phone_number: "",
    images: null as any,
    price_lowest: "",
    price_highest: "",
    province: "",
  });

  const router = useRouter();

  const isFormValid = () => {
    // Kiểm tra tất cả các trường dữ liệu có giá trị không rỗng
    for (const key in storeData) {
      if (!storeData[key as keyof typeof storeData]) {
        console.log(key);

        return false;
      }
    }

    return true;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    const imgs =
      files && Array.from(files).map((file) => URL.createObjectURL(file));
    imgs && setImgsBlob(imgs);

    if (files) {
      setStoreData({
        ...storeData,
        images: files,
      });
    }
  };

  useEffect(() => {
    // Kiểm tra xem có dữ liệu trong localStorage không
    const storedProvinces = localStorage.getItem("provinces");

    if (storedProvinces) {
      // Nếu có, sử dụng dữ liệu từ localStorage
      setProvinces(JSON.parse(storedProvinces));
    } else {
      // Nếu không, gọi API để lấy dữ liệu và lưu vào localStorage
      const fetchProvinces = async () => {
        try {
          const response = await fetch(
            "https://api.github.com/repos/madnh/hanhchinhvn/contents/dist/tinh_tp.json"
          );
          const data = await response.json();
          const provincesData = JSON.parse(atob(data.content));
          setProvinces(Object.values(provincesData));

          // Lưu dữ liệu vào localStorage
          localStorage.setItem(
            "provinces",
            JSON.stringify(Object.values(provincesData))
          );
        } catch (error) {
          console.error("Error fetching provinces:", error);
        }
      };

      fetchProvinces();
    }

    return () => {
      imgsBlob.forEach((img) => {
        URL.revokeObjectURL(img);
      });
    };
  }, []);

  const handleSubmit = async () => {
    if (!currentUser?._id) {
      showToast("Bạn chưa đăng nhập", "error");
      dispatch(setModalType("LOGIN"));
      return;
    }

    if (!isFormValid()) {
      showToast("Hãy điền đầy đủ thông tin", "error");
      return;
    }
    const arrImgs = Array.from(storeData.images);

    if (arrImgs.length < 5) {
      showToast("Hãy chọn ít nhất 5 tấm ảnh", "error");
      return;
    }

    setIsLoading(true);
    try {
      const { images, ...newStoreData } = storeData;

      const { data } = await axiosAuthCookieMultiData.post("/stores", {
        ...newStoreData,
        owner: currentUser._id,
      });

      const formData = new FormData();

      arrImgs.forEach((file: any) => {
        formData.append(`images`, file);
      });

      await uploadImagesStore(data.data._id, formData);

      showToast("Tạo thành công", "success");
      dispatch(setModalType(null));
      router.push(`/store/${data.data._id}`);
    } catch (error) {
      showToast("Tạo thất bại rồi", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={typeModal === "CREATE_STORE" ? true : false}
      handleCloseModal={() => {
        dispatch(removeModalType());
      }}
      commonStyles="max-w-[1000px]"
      title="Thêm địa điểm"
    >
      <div className="flex gap-8">
        <div className="w-[70%]">
          {/* tên */}
          <InputStore
            title="Tên địa điểm"
            name="name"
            placeholder="Nhập địa điểm"
            value={storeData.name}
            handleOnChange={handleInputChange}
          />
          {/* Tỉnh thành */}
          <div className="flex items-center w-full py-3">
            <div className="w-[200px] text-lg font-medium">Tỉnh thành:</div>
            <label htmlFor="province" className="border rounded-lg p-2 flex-1">
              <select
                id="province"
                name="province"
                value={storeData.province}
                onChange={handleInputChange}
                className="w-full outline-none"
              >
                <option value="">Chọn quận</option>
                {DISTRICTS.map((dictrict) => (
                  <option key={dictrict} value={dictrict}>
                    {dictrict}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* address */}
          <InputStore
            title="Địa chỉ"
            name="address"
            placeholder="Nhập địa chỉ"
            value={storeData.address}
            handleOnChange={handleInputChange}
          />
          {/* phonenumber */}
          <InputStore
            title="Số điện thoại"
            name="phone_number"
            placeholder="Nhập số điện thoại"
            value={storeData.phone_number}
            handleOnChange={handleInputChange}
          />

          {/* Tỉnh thành */}
          <div className="flex items-center w-full py-3">
            <div className="w-[200px] text-lg font-medium">
              Món ăn quốc gia:
            </div>
            <label htmlFor="province" className="border rounded-lg p-2 flex-1">
              <select
                id="cuisine_national"
                name="cuisine_national"
                value={storeData.cuisine_national}
                onChange={handleInputChange}
                className="w-full outline-none"
              >
                <option value="">Chọn món ăn</option>
                {CUISINE_NATIONAL_FOOD.map((dish) => (
                  <option key={dish.key} value={dish.key}>
                    {dish.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* slogan */}
          <InputStore
            title="Khẩu hiệu"
            name="slogan"
            value={storeData.slogan}
            handleOnChange={handleInputChange}
          />

          {/* price cao */}
          <InputStore
            title="Giá cao nhất"
            name="price_highest"
            value={storeData.price_highest}
            handleOnChange={handleInputChange}
          />
          {/* price thấp */}
          <InputStore
            title="Giá thấp nhất"
            name="price_lowest"
            value={storeData.price_lowest}
            handleOnChange={handleInputChange}
          />
          {/* frame times */}
          <div className="flex items-center w-full py-3">
            <div className="w-[200px] text-lg font-medium">Khung giờ:</div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {/* open_time */}
              <label htmlFor="open_time" className="border rounded-lg p-2">
                <select
                  id="open_time"
                  name="open_time"
                  value={storeData.open_time}
                  onChange={handleInputChange}
                  className="w-full outline-none"
                >
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>
              {/* close_time */}
              <label htmlFor="close_time" className="border rounded-lg p-2">
                <select
                  id="close_time"
                  name="close_time"
                  value={storeData.close_time}
                  onChange={handleInputChange}
                  className="w-full outline-none"
                >
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {/* <input type="time" name="" className="w-full h-full" /> */}
              </label>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-[30%]">
          <h2 className="text-xl font-bold">Hình ảnh đại diện</h2>
          {/* avatar */}
          <label
            htmlFor="images"
            className="cursor-pointer block relative w-[96%] aspect-[1/1] mt-4 rounded-xl border-[3px] border-second border-dashed"
          >
            {storeData.images ? (
              <>
                <Image
                  src={
                    Array.from(storeData.images)[0]
                      ? URL.createObjectURL(Array.from(storeData.images)[0])
                      : ""
                  }
                  alt="avatar"
                  fill
                  className="rounded-xl object-cover"
                />
                {Array.from(storeData.images).length > 1 ? (
                  <p className="absolute bg-[#00000070] p-2 text-lg font-medium rounded-full bottom-4 right-4 text-white">
                    {Array.from(storeData.images).length - 1}
                  </p>
                ) : null}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center flex-col gap-4 ">
                <Image
                  src="/img-upload.png"
                  alt="avatar"
                  width={70}
                  height={70}
                />
                <p className="text-lg">Click vào để tải ảnh lên</p>
              </div>
            )}

            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              accept="image/*"
              id="images"
              multiple
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="border-t flex w-full justify-end pt-3">
        <BtnCommon
          title={isLoading ? "Đang xử lý..." : "Tạo địa điểm"}
          commonStyles="w-fit"
          disabled={isLoading}
          handleClick={handleSubmit}
        />
      </div>
    </Modal>
  );
}

interface IInputStore {
  title: string;
  name: string;
  value: string;
  placeholder?: string;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputStore = ({
  title,
  name,
  value,
  placeholder,
  handleOnChange,
}: IInputStore) => {
  return (
    <div className="flex items-center w-full py-3">
      <div className="w-[200px] text-lg font-medium">{title}:</div>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        className="border p-2 rounded-md flex-1"
        onChange={handleOnChange}
      />
    </div>
  );
};
