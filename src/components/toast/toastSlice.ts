import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  toastState: boolean;
  message: string;
  type: "success" | "error" | "";
}

interface ToastPayload {
  message: string;
  type: "success" | "error";
}

const initialState: ToastState = {
  toastState: false,
  message: "",
  type: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.toastState = true;
    },
    hideToast: (state) => {
      state.toastState = false;
      state.message = "";
      state.type = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;