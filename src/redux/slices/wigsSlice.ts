import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { getApi } from "@/lib/api";
import { handleAsyncThunk } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

const initialWigs = [
  {
    _id: uuidv4(),
    description: "Gym",
    completed: false,
  },
  {
    _id: uuidv4(),
    description: "Code",
    completed: false,
  },
  {
    _id: uuidv4(),
    description: "Read",
    completed: false,
  },
];

export interface IWigs {
  _id: string;
  description: string;
  completed: boolean;
}

export interface WigsState {
  wigs: IWigs[] | undefined;
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

const initialState: WigsState = {
  wigs: initialWigs,
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: undefined,
};

export const getUserWigs = createAsyncThunk(
  "wigs/getUserWigs",
  async (_, { rejectWithValue }) => {
    return getApi("/wigs/getUserWigs", rejectWithValue);
  },
);

const wigsSlice = createSlice({
  name: "wigs",
  initialState,
  reducers: {
    createWig(state, action: PayloadAction<IWigs>) {
      state.wigs?.push(action.payload);
    },
    updateWig(state, action: PayloadAction<IWigs>) {
      const { _id, description, completed } = action.payload;
      const wig = state.wigs?.find((wig) => wig._id === _id);

      if (wig) {
        if (description !== undefined) wig.description = description;
        if (completed !== undefined) wig.completed = completed;
      }

      state.wigs?.sort((a, b) => Number(a.completed) - Number(b.completed));
    },
    removeWig(state, action: PayloadAction<string>) {
      const wigId = action.payload;
      state.wigs = state.wigs?.filter((wig) => wig._id !== wigId);
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, getUserWigs, (state, action) => {
      state.wigs = action.payload.wigs;
    });
  },
});

export const { createWig, updateWig, removeWig, setError, clearError } =
  wigsSlice.actions;
export const getWigs = (state: RootState) => state.wigs.wigs;
export const getStatus = (state: RootState) => state.wigs.status;
export const getError = (state: RootState) => state.wigs.error;

export default wigsSlice.reducer;
