"use client";

import { BtnCommon } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDistrict, setNational } from "@/redux/slices/authSlice";
import { removeModalType, setModalType } from "@/redux/slices/modalSlice";
import { axiosAuthCookieMultiData } from "@/utils/api";
import { generateTimeOptions } from "@/utils/common";
import { ICreateStore } from "@/utils/interface";
import { getDistrictsFromAPI, getNationalFromAPI } from "@/utils/proxy";
import { showToast } from "@/utils/toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "./modal";
import axios from "axios";

export default function ModalStore() {
  const { typeModal } = useAppSelector((state) => state.modal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [imgsBlob, setImgsBlob] = useState<string[]>([]);
  const [storeData, setStoreData] = useState<ICreateStore>({
    name: "",
    watch_word: "",
    locationFood_id: 1,
    openTime: "08:00",
    closeTime: "08:00",
    address: "",
    numberPhone: "",
    //images: null as any,
    lowestPrince: "",
    highestPrince: "",
    area_id: 1,
  });

  const router = useRouter();
  // const isFormValid = () => {
  //   // Kiểm tra tất cả các trường dữ liệu có giá trị không rỗng
  //   for (const key in storeData) {
  //     if (!storeData[key as keyof typeof storeData]) {
  //       console.log(key);

  //       return false;
  //     }
  //   }

  //   return true;
  // };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const convertedValue =
      name === "lowestPrince" || name === "highestPrince"
        ? parseInt(value, 10) // Chuyển đổi giá trị sang số nguyên
        : value; // Giữ nguyên giá trị cho các trường khác
    setStoreData({
      ...storeData,
      [name]: convertedValue,
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
        //images: files,
      });
    }
  };
  const { currentDistrict, currentNational, access_token } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (access_token && !currentDistrict) {
      const getDistricts = async () => {
        try {
          const District = await getDistrictsFromAPI(access_token);
          if (District) {
            dispatch(setDistrict(District));
          } else {
            console.log("Không tìm thấy địa điểm nào.");
          }
        } catch (error) {
          console.log("Lỗi khi gửi yêu cầu lấy thông tin địa điểm:", error);
        }
      };
      getDistricts();
    }
  }, [access_token, currentDistrict]);

  useEffect(() => {
    if (access_token && !currentNational) {
      const getNationals = async () => {
        try {
          const National = await getNationalFromAPI(access_token);
          if (National) {
            dispatch(setNational(National));
            // console.log(National);
          } else {
            console.log("Không tìm thấy món ăn nào.");
          }
        } catch (error) {
          console.log("Lỗi khi gửi yêu cầu lấy thông tin món ăn:", error);
        }
      };
      getNationals();
    }
  }, [access_token, currentNational]);
  // console.log(currentNational);

  const handleSubmit = async () => {
    if (!currentUser?.id) {
      showToast("Bạn chưa đăng nhập", "error");
      dispatch(setModalType("LOGIN"));
      return;
    }

    // if (!isFormValid()) {
    //   showToast("Hãy điền đầy đủ thông tin", "error");
    //   return;
    // }
    //const arrImgs = Array.from(storeData.images);

    setIsLoading(true);
    try {
      if (access_token) {
        console.log(access_token);
        const { ...newStoreData } = storeData;
        const headers = {
          Authorization: `Bearer ${access_token}`,
        };

        const { data } = await axios.post(
          "http://26.177.67.186:8080/location",
          {
            ...newStoreData,
            owner: currentUser.id,
          },
          { headers }
        );
        // const formData = new FormData();

        // arrImgs.forEach((file: any) => {
        //   formData.append(`images`, file);
        // });
        console.log(storeData);
        showToast("Tạo thành công", "success");
        dispatch(setModalType(null));
      }
    } catch (error) {
      showToast("Tạo thất bại rồi", "error");
      console.error("Error:", error);
      // console.log(storeData);
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
                id="area_id"
                name="area_id"
                value={storeData.area_id}
                onChange={handleInputChange}
                className="w-full outline-none"
              >
                <option value="">Chọn tỉnh</option>
                {currentDistrict &&
                  Array.isArray(currentDistrict) &&
                  currentDistrict.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.value}
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
            name="numberPhone"
            placeholder="Nhập số điện thoại"
            value={storeData.numberPhone}
            handleOnChange={handleInputChange}
          />

          {/* Món ăn national */}
          <div className="flex items-center w-full py-3">
            <div className="w-[200px] text-lg font-medium">
              Món ăn quốc gia:
            </div>
            <label
              htmlFor="locationFood_id"
              className="border rounded-lg p-2 flex-1"
            >
              <select
                id="locationFood_id"
                name="locationFood_id"
                value={storeData.locationFood_id}
                onChange={handleInputChange}
                className="w-full outline-none"
              >
                <option value="">Chọn món ăn</option>
                {currentNational &&
                  Array.isArray(currentNational) &&
                  currentNational.map((national) => (
                    <option key={national.key} value={national.id}>
                      {national.value}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          {/* slogan */}
          <InputStore
            title="Khẩu hiệu"
            name="watch_word"
            value={storeData.watch_word}
            handleOnChange={handleInputChange}
          />

          {/* price cao */}
          <InputStore
            title="Giá cao nhất"
            name="highestPrince"
            value={storeData.highestPrince}
            handleOnChange={handleInputChange}
          />
          {/* price thấp */}
          <InputStore
            title="Giá thấp nhất"
            name="lowestPrince"
            value={storeData.lowestPrince}
            handleOnChange={handleInputChange}
          />
          {/* frame times */}
          <div className="flex items-center w-full py-3">
            <div className="w-[200px] text-lg font-medium">Khung giờ:</div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {/* openTime */}
              <label htmlFor="openTime" className="border rounded-lg p-2">
                <select
                  id="openTime"
                  name="openTime"
                  value={storeData.openTime}
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
              {/* closeTime */}
              <label htmlFor="closeTime" className="border rounded-lg p-2">
                <select
                  id="closeTime"
                  name="closeTime"
                  value={storeData.closeTime}
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
          {/* <label
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
          </label> */}
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
