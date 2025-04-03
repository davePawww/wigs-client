import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import wigsReducer from "@/redux/slices/wigsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wigs: wigsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
