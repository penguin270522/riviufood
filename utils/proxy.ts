import { axiosAuthCookie, axiosAuthCookieMultiData, axiosNonAuth } from "./api";
import { getCookie } from "./common";
import { ICreateComment } from "./interface";
import axios from "axios";

export const getUserById = async (userId: string) => {
  return await axiosAuthCookie.get(`/api/auth/${userId}`);
};
export const getDistrictsFromAPI = async (token: string) => {
  try {
    const response = await axios.get("http://26.177.67.186:8080/area", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách các quận từ API:", error);
    return []; // Trả về mảng rỗng trong trường hợp có lỗi
  }
};

export const getNationalFromAPI = async (token: string) => {
  try {
    const response = await axios.get("http://26.177.67.186:8080/review/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách các món từ API:", error);
    return []; // Trả về mảng rỗng trong trường hợp có lỗi
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get("http://26.177.67.186:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return undefined;
  }
};

export const getCurrentFoodStore = async (token: string) => {
  try {
    const response = await axios.get("http://26.177.67.186:8080/review", {});
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return []; // Trả về mảng rỗng trong trường hợp có lỗi
  }
};

export const userLogin = async (name: string, password: string) => {
  return await axiosNonAuth.post("/api/auth/login", {
    name,
    password,
  });
};

export const userSignUpApi = async (
  email: string,
  password: string,
  name: string
) => {
  return await axiosNonAuth.post("/api/auth/register", {
    email,
    password,
    name,
  });
};

export const getStores = async (search?: string) => {
  return await axiosNonAuth.get(`/posts${search ? `?search=${search}` : ""}`);
};

export const getStoreById = async (storeId: string) => {
  return await axiosNonAuth.get(`/posts/postall/${storeId}`);
};

export const uploadImagesReview = async (
  reviewId: string,
  formData: FormData
) => {
  return await axiosAuthCookieMultiData.post(
    `/review/upload/${reviewId}`,
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
  return await axiosNonAuth.get(`/review/${reviewId}/detail`);
};

export const createComment = async (reviewId: string, body: ICreateComment) => {
  return await axiosNonAuth.post(`/comments/${reviewId}`, body);
};

export const getUserReviews = async (userId: string) => {
  return await axiosAuthCookie.get(`/review/${userId}/me`);
};

export const getUserStores = async (userId: string) => {
  return await axiosAuthCookie.get(`/stores/${userId}/me`);
};

export const getTopStores = async () => {
  return await axiosAuthCookie.get(`/posts/postall`);
};

export const getTopUsersReviews = async () => {
  return await axiosAuthCookie.get(`/posts/postall`);
};

export const getReviewsByNational = async (token: string, national: string) => {
  try {
    const response = await axios.get(
      `http://26.177.67.186:8080/review/${national}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách các bài viết:", error);
    return [];
  }
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
