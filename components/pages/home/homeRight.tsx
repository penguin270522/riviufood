import { CardTopReview, CardTopStore } from "@/components/commons";
import CardOutstanding from "@/components/commons/cardOutstanding";
import CardUserOutstanding from "@/components/commons/cardUserStanding";
import LoadingScreen from "@/components/commons/loading";
import { useAppSelector } from "@/redux/hooks";
import { baseURL } from "@/utils/api";
import { IStore, IUser } from "@/utils/interface";
import { getTopStores, getTopUsersReviews } from "@/utils/proxy";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomeRight() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [topUsers, setTopUsers] = useState<IUser[]>([]);
  const [topStores, setTopStores] = useState<IStore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getStores = async () => {
      setIsLoading(true);
      try {
        const [topUsersResponse, topStoresResponse] = await Promise.all([
          getTopUsersReviews(),
          getTopStores(),
        ]);

        setTopUsers(topUsersResponse.data.data);
        setTopStores(topStoresResponse.data.data);
      } catch (error) {
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    };
    getStores();
  }, []);

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}

      <div className="w-[33%]">
        {/* user */}
        <div className="bg-white rounded-xl p-4 shadow-lg">
          {currentUser ? (
            <div>
              <div className="flex items-center gap-4 pb-4">
                <div className="relative h-full w-[20%] aspect-[1/1]">
                  <Image
                    src={
                      currentUser?.avatar
                        ? `${baseURL}/users/avatar/${currentUser?.avatar}`
                        : "/avatar_1.png"
                    }
                    alt="banner"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-txt-primary text-2xl font-semibold flex justify-center gap-3 flex-col">
                    {currentUser.name}
                  </h4>
                  <p>{currentUser.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center text-xl ">
                    <div className="text-txt-primary font-semibold">
                      {currentUser.totalReviews}
                    </div>
                    <p className="text-txt-second font-medium">Bài viết</p>
                  </div>
                  <div className="text-center text-xl ">
                    <div className="text-txt-primary font-semibold">0</div>
                    <p className="text-txt-second font-medium">
                      Người theo dõi
                    </p>
                  </div>
                  <div className="text-center text-xl ">
                    <div className="text-txt-primary font-semibold">0</div>
                    <p className="text-txt-second font-medium">Đang theo dõi</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col gap-4">
              <Image
                src="/star_logo_login.svg"
                alt="star_logo_login"
                width={150}
                height={150}
              />

              <p className="text-xl text-primary font-medium text-center">
                Đăng nhập vào Riviu để cùng nhau ăn khắp nơi chơi khắp chốn bạn
                nhé!
              </p>
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="py-3 bg-input font-semibold text-lg rounded-xl text-center cursor-pointer hover:bg-[#e3e5e7] transition-colors">
                  Đăng ký
                </div>
                <div className="py-3 text-second bg-[#fff7f2] font-semibold text-lg rounded-xl text-center cursor-pointer hover:bg-[#ffe7d9] transition-colors">
                  Đăng nhập
                </div>
              </div>
            </div>
          )}
        </div>

        {/* adverti */}
        <div className="relative aspect-[1/1] mt-6">
          <Image
            src="/banner-detail-star.png"
            alt="banner-detail-star"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* store outstanding */}
        <div className="bg-white rounded-xl p-4 shadow-lg mt-6">
          <h2 className="text-xl text-txt-second font-semibold py-3">
            Top địa điểm nổi bật
          </h2>

          <div className="border-t border-[#f4f5f8] py-2 grid grid-cols-1 gap-4">
            {topStores?.length ? (
              topStores.map((store, index) => (
                <CardTopStore key={index} store={store} />
              ))
            ) : (
              <div className="text-center mt-6 text-xl font-medium">
                Không có địa điểm nào
              </div>
            )}
          </div>
        </div>

        {/* users outstanding */}
        <div className="bg-white rounded-xl p-4 shadow-lg mt-6">
          <h2 className="text-xl text-txt-second font-semibold py-3">
            Top tài khoản nổi bật
          </h2>

          <div className="border-t border-[#f4f5f8] py-2 grid grid-cols-1 gap-4">
            {topUsers?.length ? (
              topUsers.map((user, index) => (
                <CardTopReview key={index} user={user} />
              ))
            ) : (
              <div className="text-center mt-6 text-xl font-medium">
                Không có người dùng nào
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
