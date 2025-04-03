import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export interface IWigs {
  id: string;
  description: string;
  completed: boolean;
}

export interface WigsState {
  wigs: IWigs[] | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

const initialState: WigsState = {
  wigs: null,
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: undefined,
};

const wigsSlice = createSlice({
  name: "wigs",
  initialState,
  reducers: {},
});

export const getWigs = (state: RootState) => state.wigs.wigs;
export const getStatus = (state: RootState) => state.wigs.status;
export const getError = (state: RootState) => state.wigs.error;

export default wigsSlice.reducer;
