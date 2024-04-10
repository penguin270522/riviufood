import { currentUserLogOut } from "@/redux/slices/authSlice";
import store from "@/redux/store";
import { getCookie, setCookie } from "@/utils/common";
// import { showToast } from '@/utils/helpers/toastify';
import axios from "axios";
export const baseURL = "http://26.177.67.186:8080";
const myCookieValue = getCookie("token");

export const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};  


export const axiosNonAuth = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuthCookieMultiData = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const axiosAuthCookie = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token: string) => {
  axiosAuthCookie.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Lấy token từ cookie và set vào axiosAuthCookie
const loadAuthToken = () => {
  const token = myCookieValue;

  if (token) {
    setAuthToken(token);
  }
};

loadAuthToken();
// Set token vào cookie và axiosAuthCookie'

export const saveAuthToken = (token: string) => {
  setCookie("access_token", token, { expires: 1 });
  setAuthToken(token);
};

axiosAuthCookie.interceptors.response.use(
  (response) => {
    // xử lý dữ liệu thành công trả về
    console.log("res axiosAuthCookie : ", response);

    return response;
  },
  async (error) => {
    const previousRequest = error.config;

    if (
      error.response?.data?.detail?.status_code === 401 &&
      error.response?.data?.detail?.message === "UNAUTHORIZED"
      // &// retryCount < 3
    ) {
      store.dispatch(currentUserLogOut());
      error.response.data.detail.message = "";
      //   showToast('your access period has expired, please login again', 'warn');

      // retryCount += 1;

      // try {
      //   const { data } = await refreshToken();
      //   console.log('authorization : ', data);
      // } catch (error) {
      //   console.log('error', error);
      // }

      // axiosAuthCookie.defaults.headers.common[
      //   'Authorization'
      // ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIyMTk4ZTdhMi1iMDAwLTQ4YjItODA3Yy1kMzIyOTEzODMyOGQiLCJleHAiOjE2ODMyNjgwNzZ9.I7eq50-UQEyKpGPHYbc0RFKOdIbljhbvX2sjwsoXOFM`;

      // return axiosAuthCookie(previousRequest);
    }
    // else {
    //   store.dispatch(currentUserLogOut());
    //   showToast('your access period has expired, please login again', 'warn');
    // }
    return Promise.reject(error);
  }
);
