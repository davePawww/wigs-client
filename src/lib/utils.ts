import { AuthState } from "@/redux/slices/authSlice";
import {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleAxiosError = (error: unknown) => {
  const axiosError = error as AxiosError<{ message: string }>;
  return axiosError.response?.data.message || "An unexpected error occurred";
};

export const handleAsyncThunk = <Returned, ThunkArg>(
  builder: ActionReducerMapBuilder<AuthState>,
  asyncThunk: AsyncThunk<Returned, ThunkArg, object>,
  onSuccess?: (state: AuthState, action: PayloadAction<Returned>) => void,
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.status = "loading";
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.status = "success";
      if (onSuccess) {
        onSuccess(state, action);
      }
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as string;
    });
};
