import { createSlice } from "@reduxjs/toolkit";

export type TYPE_MODAL = "LOGIN" | "SIGN_UP" | "CREATE_STORE" | "UPDATE_AVATAR" | "SEARCH_STORE";

interface IInitstates {
  typeModal: TYPE_MODAL | null;
  isOpen: boolean;
}

const initialState: IInitstates = {
  typeModal: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setModalType: (
      state,
      action: {
        type: string;
        payload: TYPE_MODAL | null;
      }
    ) => {
      //
      state.typeModal = action.payload;
      state.isOpen = true;
    },
    removeModalType: (state) => {
      state.isOpen = false;
      state.typeModal = null;
    },
  },
});

export const { removeModalType, setModalType } = modalSlice.actions;
export default modalSlice.reducer;
