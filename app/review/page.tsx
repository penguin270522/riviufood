"use client";

import { BtnCommon } from "@/components";
import LoadingScreen from "@/components/commons/loading";
import StarRatings from "@/components/commons/starRating";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalType } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import { axiosNonAuth } from "@/utils/api";
import { uploadImagesReview } from "@/utils/proxy";
import { showToast } from "@/utils/toastify";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function WriteReview() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState({
    title: "",
    content: "",
    images: null as any,
    rating: {
      serve: 0,
      price: 0,
      space: 0,
      smell: 0,
      food_safety: 0,
    },
  });
  const [imgsBlob, setImgsBlob] = useState<string[]>([]);
  const { currentUser } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");

  useEffect(() => {
    return () => {
      imgsBlob.forEach((img) => {
        URL.revokeObjectURL(img);
      });
    };
  }, []);

  const isFormValid = () => {
    // Kiểm tra tất cả các trường dữ liệu có giá trị không rỗng
    for (const key in reviewData) {
      if (!reviewData[key as keyof typeof reviewData]) {
        return false;
      }
    }

    return true;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setReviewData({
        ...reviewData,
        images: files,
      });
    }
    const imgs =
      files && Array.from(files).map((file) => URL.createObjectURL(file));
    imgs && setImgsBlob(imgs);
  };

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
    const { images, ...newReviewData } = reviewData;
    const arrImgs = Array.from(images);

    if (arrImgs.length < 1) {
      showToast("Hãy chọn ít nhất 1 tấm ảnh", "error");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axiosNonAuth.post("/reviews", {
        ...newReviewData,
        store: storeId,
        author: currentUser._id,
      });

      const formData = new FormData();

      arrImgs.forEach((file: any) => {
        formData.append(`images`, file);
      });

      await uploadImagesReview(data.data._id, formData);
      showToast("Tạo thành công");

      dispatch(setModalType(null));
      router.push(`/store/${storeId}`);
    } catch (error) {
      showToast("Tạo thất bại", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <div className="px-px-body py-6">
        <h2 className="text-5xl font-bold text-center ">Viết Riviu</h2>

        <div className="p-6 mt-6 rounded-xl bg-white">
          <div className="flex gap-8">
            {/* left */}
            <div className="w-[65%]">
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                className="h-12 w-full outline-none bg-transparent p-4 text-4xl font-semibold mb-4"
                placeholder="Viết tiêu đề ..."
              />

              <div className="rounded-xl border p-4">
                <textarea
                  name="content"
                  id=""
                  cols={30}
                  rows={10}
                  value={reviewData.content}
                  onChange={handleInputChange}
                  className="text-txt-primary outline-none w-full h-full font-semibold text-2xl resize-none overflow-hidden"
                  placeholder="Bạn có gì muốn Riviu ..."
                ></textarea>
              </div>

              {/* images */}
              <div className="mt-6">
                <div className="grid grid-cols-5 gap-3 relative">
                  <>
                    {imgsBlob.length > 4 ? (
                      <p className="absolute z-10 bg-[#00000070] p-2 text-lg font-medium rounded-full bottom-4 right-4 text-white">
                        {imgsBlob.length - 4}
                      </p>
                    ) : null}
                  </>
                  <label className="aspect-[1/1] rounded-xl border border-dotted flex items-center flex-col justify-center gap-2">
                    <Image src="/lanscape.svg" alt="" width={34} height={34} />
                    <span className="text-lg">Tải ảnh lên</span>
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
                  {imgsBlob.slice(0, 4).map((blob, index) => (
                    <div
                      key={index}
                      className="aspect-[1/1] relative rounded-xl overflow-hidden shadow"
                    >
                      <Image src={blob} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* right */}
            <div className="w-[35%]">
              <h2 className="text-3xl text-txt-second font-semibold mb-4 mt-3">
                Địa điểm
              </h2>
              {/* choose store */}
              <div className="rounded-xl border border-dotted flex items-center justify-center gap-3 h-[150px] cursor-pointer">
                <Image src="/address.svg" alt="" width={34} height={34} />
                <span className="text-xl text-txt-second">
                  Nhấn vào để chọn địa điểm
                </span>
              </div>

              {/* rating */}
              <h2 className="text-3xl text-txt-second font-semibold mb-4 mt-3">
                Địa điểm
              </h2>

              <div className="border-t grid grid-cols-1 gap-4 py-5">
                <div className="flex justify-between items-center">
                  <h5 className="text-xl font-medium">Vệ sinh</h5>
                  <StarRatings
                    rating={reviewData.rating.food_safety}
                    handleOnChangeRating={(point) => {
                      setReviewData((prev) => ({
                        ...prev,
                        rating: {
                          ...prev.rating,
                          food_safety: point,
                        },
                      }));
                    }}
                    isEdit={true}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="text-xl font-medium">Hương vị</h5>
                  <StarRatings
                    rating={reviewData.rating.smell}
                    handleOnChangeRating={(point) => {
                      setReviewData((prev) => ({
                        ...prev,
                        rating: {
                          ...prev.rating,
                          smell: point,
                        },
                      }));
                    }}
                    isEdit={true}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="text-xl font-medium">Không gian</h5>
                  <StarRatings
                    rating={reviewData.rating.space}
                    handleOnChangeRating={(point) => {
                      setReviewData((prev) => ({
                        ...prev,
                        rating: {
                          ...prev.rating,
                          space: point,
                        },
                      }));
                    }}
                    isEdit={true}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="text-xl font-medium">Giá cả</h5>
                  <StarRatings
                    rating={reviewData.rating.price}
                    handleOnChangeRating={(point) => {
                      setReviewData((prev) => ({
                        ...prev,
                        rating: {
                          ...prev.rating,
                          price: point,
                        },
                      }));
                    }}
                    isEdit={true}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="text-xl font-medium">Phục vụ</h5>
                  <StarRatings
                    rating={reviewData.rating.serve}
                    handleOnChangeRating={(point) => {
                      setReviewData((prev) => ({
                        ...prev,
                        rating: {
                          ...prev.rating,
                          serve: point,
                        },
                      }));
                    }}
                    isEdit={true}
                  />
                </div>
              </div>

              {/* btn submit */}
              <BtnCommon
                title={isLoading ? "Đang xử lý..." : "Đăng bài"}
                commonStyles=""
                handleClick={handleSubmit}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
