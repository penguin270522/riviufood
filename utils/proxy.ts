import { axiosAuthCookie, axiosAuthCookieMultiData, axiosNonAuth } from "./api";
import { getCookie } from "./common";
import { ICreateComment } from "./interface";

export const getUserById = async (userId: string) => {
  return await axiosAuthCookie.get(`/users/${userId}`);
};

export const getCurrentUser = async () => {
  const token = getCookie("access_token");
  return await axiosAuthCookie.get("/users/me", {
    headers: {
      token: token,
    },
  });
};

export const userLogin = async (email: string, password: string) => {
  return await axiosNonAuth.post("/users/sign-in", {
    email,
    password,
  });
};

export const userSignUpApi = async (
  email: string,
  password: string,
  name: string
) => {
  return await axiosNonAuth.post("/users/sign-up", {
    email,
    password,
    name,
  });
};

export const getStores = async (search?: string) => {
  return await axiosNonAuth.get(`/stores${search ? `?search=${search}` : ""}`);
};

export const getStoreById = async (storeId: string) => {
  return await axiosNonAuth.get(`/stores/${storeId}`);
};

export const uploadImagesReview = async (
  reviewId: string,
  formData: FormData
) => {
  return await axiosAuthCookieMultiData.post(
    `/reviews/upload/${reviewId}`,
    formData
  );
};

export const uploadImagesStore = async (
  storeId: string,
  formData: FormData
) => {
  return await axiosAuthCookieMultiData.post(
    `/stores/upload/${storeId}`,
    formData
  );
};

export const uploadAvatar = async (userId: string, formData: FormData) => {
  return await axiosAuthCookieMultiData.post(
    `/users/upload/${userId}`,
    formData
  );
};

export const getReviewById = async (reviewId: string) => {
  return await axiosNonAuth.get(`/reviews/${reviewId}/detail`);
};

export const createComment = async (reviewId: string, body: ICreateComment) => {
  return await axiosNonAuth.post(`/comments/${reviewId}`, body);
};

export const getUserReviews = async (userId: string) => {
  return await axiosAuthCookie.get(`/reviews/${userId}/me`);
};

export const getUserStores = async (userId: string) => {
  return await axiosAuthCookie.get(`/stores/${userId}/me`);
};

export const getTopStores = async () => {
  return await axiosAuthCookie.get(`/stores/top`);
};

export const getTopUsersReviews = async () => {
  return await axiosAuthCookie.get(`/reviews/top/users`);
};

export const getReviewsByNational = async (
  national: string,
  rating: string
) => {
  return await axiosAuthCookie.get(
    `/reviews/${national}/post?${rating ? `rating=${rating}` : ""}`
  );
};

export const likeReview = async (reviewId: string, userId: string) => {
  return await axiosAuthCookie.patch(`/reviews/like/${reviewId}/${userId}`);
};

export const editReviewById = async (reviewId: string, body: any) => {
  return await axiosAuthCookie.patch(`/reviews/${reviewId}`, body);
};

export const deleteReviewById = async (reviewId: string) => {
  return await axiosAuthCookie.delete(`/reviews/${reviewId}`);
};

export const editStoreById = async (storeId: string, body: any) => {
  return await axiosAuthCookie.patch(`/stores/${storeId}`, body);
};

export const deleteStoreById = async (storeId: string) => {
  return await axiosAuthCookie.delete(`/stores/${storeId}`);
};
