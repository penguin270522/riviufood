"use client";

import LoadingScreen from "@/components/commons/loading";
import ModalConfirm from "@/components/layouts/modalCommon/modalConfirm";
import { useAppSelector } from "@/redux/hooks";
import { baseURL } from "@/utils/api";
import { IReview, IStore } from "@/utils/interface";
import { deleteStoreById, getUserStores } from "@/utils/proxy";
import { showToast } from "@/utils/toastify";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserStores() {
  const [userStores, setUserStores] = useState<IStore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const searchParams = useSearchParams();
  const userId = searchParams.get("uid") ?? currentUser?._id;

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await getUserStores(userId!);
        setUserStores(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) getUser();
  }, [userId]);

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      {userStores.length ? (
        <div className="grid grid-cols-2 gap-8">
          {userStores.map((store, ind) => (
            <Card key={ind} store={store} />
          ))}
        </div>
      ) : (
        <div className="w-full text-center text-2xl font-semibold mt-8">
          Chưa có Địa điểm nào .{" "}
        </div>
      )}
    </>
  );
}

interface ICard {
  store: IStore;
}

function Card({ store }: ICard) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteStoreById(store._id);
      showToast("Xoá thành công");
    } catch (error) {
      showToast("Không thể xoá", "error");
    } finally {
      setIsLoading(false);
      handleClosePopup();
    }
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Link
        href={`/store/${store._id}`}
        className="relative flex gap-4 border shadow-md p-4 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="h-[150px] w-[150px] relative">
          <Image
            src={`${baseURL}/stores/image/${store._id}/${store.images[0]}`}
            alt="post"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="p-3">
          <h2 className="line-clamp-1 text-xl font-semibold">{store.name}</h2>
          <p className="line-clamp-1 text-xl font-medium text-txt-second">
            {store.address}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <Image src="/time.svg" alt="post" width={20} height={20} />
            <p className="text-txt-second font-medium">{store.close_time}</p>-
            <p className="text-txt-second font-medium">{store.open_time}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Image src="/dolar.svg" alt="post" width={24} height={24} />
            <p className="text-txt-second font-medium">
              {store.price_lowest} vnđ
            </p>
            -
            <p className="text-txt-second font-medium">
              {store.price_highest} vnđ
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 rounded-full p-4 transition-all bg-[#f0f2f4] hover:bg-slate-400 group">
          <Image src="/more.svg" alt="more icon" width={24} height={24} />

          <div className="relative">
            <div className="absolute rounded-xl w-[150px] top-full right-0 bg-white p-2 shadow-2xl scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <div
                className="flex items-center gap-4 p-3 hover:bg-red-500 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenPopup();
                }}
              >
                <Image src="/trash.svg" alt="trash" width={24} height={24} />
                <span className="text-lg font-medium">delete</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <ModalConfirm
        title="Xác nhận xoá địa điểm này"
        disabled={isLoading}
        handleCloseModal={handleClosePopup}
        handleOnAccept={handleDelete}
        isOpen={isOpen}
      />
    </>
  );
}
