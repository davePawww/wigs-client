import {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
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

interface AsyncStatusState {
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

export const handleAsyncThunk = <
  State extends AsyncStatusState,
  Returned,
  ThunkArg,
>(
  builder: ActionReducerMapBuilder<State>,
  asyncThunk: AsyncThunk<Returned, ThunkArg, object>,
  onSuccess?: (state: Draft<State>, action: PayloadAction<Returned>) => void,
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
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
