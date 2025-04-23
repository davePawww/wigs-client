import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { getApi, postApi, putApi, deleteApi } from "@/lib/api";
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
  authenticatedData: IWigs[] | undefined;
  unAuthenticatedData: IWigs[] | undefined;
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

const initialState: WigsState = {
  authenticatedData: undefined,
  unAuthenticatedData: initialWigs,
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: undefined,
};

export const getUserWigs = createAsyncThunk(
  "wigs/getUserWigs",
  async (_, { rejectWithValue }) => {
    return getApi("/wigs/getUserWigs", rejectWithValue);
  },
);

export const createWigAsync = createAsyncThunk(
  "wigs/createWig",
  async (wig: IWigs, { rejectWithValue }) => {
    return postApi("/wigs/createWig", wig, rejectWithValue);
  },
);

export const saveUpdatedWigAsync = createAsyncThunk(
  "wigs/updateWig",
  async (wig: IWigs, { rejectWithValue }) => {
    return putApi("/wigs/updateWig", wig, rejectWithValue);
  },
);

export const deleteWigAsync = createAsyncThunk(
  "wigs/deleteWig",
  async (wigId: string, { rejectWithValue }) => {
    return deleteApi(`/wigs/deleteWig/${wigId}`, wigId, rejectWithValue);
  },
);

const sortWigs = (wigs: IWigs[]) => {
  return wigs.sort((a, b) => Number(a.completed) - Number(b.completed));
};

const wigsSlice = createSlice({
  name: "wigs",
  initialState,
  reducers: {
    createWig(state, action: PayloadAction<IWigs>) {
      state.unAuthenticatedData?.push(action.payload);
    },
    updateWig(state, action: PayloadAction<IWigs>) {
      const { _id, description, completed } = action.payload;
      const wig = state.unAuthenticatedData?.find((wig) => wig._id === _id);
      if (wig) {
        if (description !== undefined) wig.description = description;
        if (completed !== undefined) wig.completed = completed;
      }
      state.unAuthenticatedData = sortWigs(state.unAuthenticatedData || []);
    },
    removeWig(state, action: PayloadAction<string>) {
      const wigId = action.payload;
      state.unAuthenticatedData = state.unAuthenticatedData?.filter(
        (wig) => wig._id !== wigId,
      );
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = undefined;
    },
    updateWigAsync(state, action: PayloadAction<IWigs>) {
      const { _id, description, completed } = action.payload;
      const wig = state.authenticatedData?.find((wig) => wig._id === _id);
      if (wig) {
        if (description !== undefined) wig.description = description;
        if (completed !== undefined) wig.completed = completed;
      }
      state.authenticatedData?.sort(
        (a, b) => Number(a.completed) - Number(b.completed),
      );
    },
  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, getUserWigs, (state, action) => {
      state.authenticatedData = sortWigs(action.payload.wigs);
    });
    handleAsyncThunk(builder, createWigAsync, (state, action) => {
      state.authenticatedData?.push(action.payload);
    });
    handleAsyncThunk(builder, saveUpdatedWigAsync, (state, action) => {
      state.authenticatedData = state.authenticatedData?.map((wig) => {
        if (wig._id === action.payload._id) {
          return {
            ...wig,
            description: action.payload.description,
            completed: action.payload.completed,
          };
        }
        return wig;
      });
      state.authenticatedData = sortWigs(state.authenticatedData || []);
    });
    handleAsyncThunk(builder, deleteWigAsync, (state, action) => {
      const wigId = action.payload._id;
      state.authenticatedData = state.authenticatedData?.filter(
        (wig) => wig._id !== wigId,
      );
    });
  },
});

export const {
  createWig,
  updateWig,
  removeWig,
  setError,
  clearError,
  updateWigAsync,
} = wigsSlice.actions;
export const getUnauthenticatedWigs = (state: RootState) =>
  state.wigs.unAuthenticatedData;
export const getAuthenticatedWigs = (state: RootState) =>
  state.wigs.authenticatedData;
export const getStatus = (state: RootState) => state.wigs.status;
export const getError = (state: RootState) => state.wigs.error;

export default wigsSlice.reducer;
