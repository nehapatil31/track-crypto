// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cryptoReducer from "./cryptoSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
