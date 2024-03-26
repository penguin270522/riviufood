"use client";

import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getStores } from "@/utils/proxy";
import { showToast } from "@/utils/toastify";
import { IReadStore, IStoreRead } from "@/utils/interface";
import LoadingSearch from "@/components/commons/loadingSearch";
import Link from "next/link";
import { baseURL } from "@/utils/api";

export default function ModalSearchStore() {
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stores, setStores] = useState<IReadStore[]>([]);

  const { typeModal } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Tạo một hàm debounce tự tạo
    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const { data } = await getStores(search);
        setStores(data.data);
      } catch (error) {
        showToast("Vui lòng thực hiện lại");
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  return (
    <>
      <Modal
        isOpen={typeModal === "SEARCH_STORE" ? true : false}
        handleCloseModal={() => dispatch(removeModalType())}
        commonStyles="max-w-[600px]"
      >
        <div className="border-b-4 py-4 flex gap-2">
          <input
            type="text"
            className="w-full text-xl pl-4"
            placeholder="Hãy nhập tên địa điểm mà bạn muốn tìm"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div>{isLoading ? <LoadingSearch /> : null}</div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 h-[400px] overflow-y-scroll -mr-4">
          {stores.length ? (
            <>
              {stores.map((store, index) => (
                <CardSearch key={index} store={store} />
              ))}
            </>
          ) : (
            <div className="text-center text-xl font-medium">
              Không tìm thấy bất kỳ địa điểm nào
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

interface ICardSearch {
  store?: IStoreRead;
}

function CardSearch({ store }: ICardSearch) {
  return (
    <Link
      href={`/store/${store?._id}`}
      className="flex gap-4 hover:bg-slate-200 cursor-pointer transition-all p-2 max-h-[190px] h-full"
    >
      <div className="aspect-[1/1] w-[26%] relative">
        <Image
          src={`${baseURL}/stores/image/${store?._id}/${store?.images[0]}`}
          alt="banner"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-2xl text-txt-primary font-semibold line-clamp-1">
          {store?.name}
        </h3>
        <div className="mt-2">
          <div className="flex gap-3 text-lg text-txt-primary font-medium">
            <Image src="/address.svg" alt="star_icon" width={20} height={20} />
            <p className="line-clamp-1">{store?.address}</p>
          </div>
          {/* price infor */}

          <div className="flex gap-3 text-lg text-txt-primary font-medium my-2">
            <Image src="/dolar.svg" alt="star_icon" width={20} height={20} />
            <p>
              {store?.price_lowest} VND - {store?.price_highest} VND
            </p>
          </div>
          {/* time infor */}
          <div className="flex gap-3 text-lg text-txt-primary font-medium">
            <Image src="/time.svg" alt="star_icon" width={20} height={20} />
            <span className="text-second">Đang mở cửa</span>
            <span>
              ({store?.close_time} - {store?.open_time})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
