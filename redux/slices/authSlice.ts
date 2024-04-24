import { saveAuthToken } from "@/utils/api";
import { getCookie, removeCookie, setCookie } from "@/utils/common";
import {
  IDistrict,
  ILocationReview,
  INational,
  IReview,
  IStore,
  IUser,
} from "@/utils/interface";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: getCookie("access_token") || null,
    isLoading: false,
    error: null,
    currentUser: null as IUser | null,
    currentDistrict: null as IDistrict | null,
    currentNational: null as INational | null,
    currentLocationReview: null as IStore | null,
    currentNationalReview: null as ILocationReview | null,
  },
  reducers: {
    userLogout: (state) => {
      removeCookie("access_token");
      removeCookie("refresh_token");

      state.access_token = null;
      state.isLoading = false;
      state.error = null;
    },
    removeError: (state) => {
      state.error = null;
    },
    setCurrentUserLogin: (
      state,
      action: {
        type: string;
        payload: { access_token: string; currentUser: IUser };
      }
    ) => {
      state.access_token = action.payload.access_token;
      state.currentUser = action.payload.currentUser;
    },
    setUserMe: (state, action) => {
      state.currentUser = action.payload;
    },
    setFoodStore: (state, action) => {
      state.currentUser = action.payload;
    },
    setDistrict: (state, action) => {
      state.currentDistrict = action.payload;
    },
    setNational: (state, action) => {
      state.currentNationalReview = action.payload;
    },
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
    setReviews: (state, action) => {
      state.currentLocationReview = action.payload;
    },
    currentUserLogOut: (state) => {
      removeCookie("access_token");
      state.currentUser = null;
      state.access_token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  userLogout,
  removeError,
  setToken,
  currentUserLogOut,
  setCurrentUserLogin,
  setUserMe,
  setDistrict,
  setNational,
  setFoodStore,
  setReviews,
} = authSlice.actions;
export default authSlice.reducer;
