import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});

export default rootReducer;
