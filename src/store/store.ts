import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "../components/toast/toastSlice";
import cryptoReducer from "../features/crypto/cryptoSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    crypto: cryptoReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
