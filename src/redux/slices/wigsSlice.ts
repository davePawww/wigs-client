import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { getApi } from "@/lib/api";
import { handleAsyncThunk } from "@/lib/utils";

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

export const fetchWigs = createAsyncThunk(
  "wigs/fetchWigs",
  async (id: string | undefined, { rejectWithValue }) => {
    return getApi(`/wigs/findById?id=${id}`, rejectWithValue);
  },
);

const wigsSlice = createSlice({
  name: "wigs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncThunk(builder, fetchWigs, (state, action) => {
      state.wigs = action.payload.wigs;
    });
  },
});

export const getWigs = (state: RootState) => state.wigs.wigs;
export const getStatus = (state: RootState) => state.wigs.status;
export const getError = (state: RootState) => state.wigs.error;

export default wigsSlice.reducer;
