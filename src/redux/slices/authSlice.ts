import { RootState } from "@/redux/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleAsyncThunk } from "@/lib/utils";
import { getApi, postApi } from "@/lib/api";

export interface IUser {
  _id: string;
  name?: string;
  email: string;
  password: string;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  provider?: string;
  providerId?: string;
}

export interface AuthState {
  user: IUser | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

const initialState: AuthState = {
  user: null,
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: undefined,
};

export const isAuthenticated = createAsyncThunk(
  "auth/isAuthenticated",
  async (_, { rejectWithValue }) => {
    return getApi("/auth/me", rejectWithValue);
  },
);

export const register = createAsyncThunk(
  "auth/signup",
  async (data: IUser, { rejectWithValue }) => {
    return postApi("/auth/register", data, rejectWithValue);
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (verificationToken: string, { rejectWithValue }) => {
    return postApi(
      "/auth/verify-email",
      { verificationToken },
      rejectWithValue,
    );
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: IUser, { rejectWithValue }) => {
    return postApi("/auth/login", data, rejectWithValue);
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    return postApi("/auth/logout", null, rejectWithValue);
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    return postApi("/auth/forgot-password", { email }, rejectWithValue);
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { password, token }: { password: string; token: string },
    { rejectWithValue },
  ) => {
    return postApi(
      `/auth/reset-password/${token}`,
      { password },
      rejectWithValue,
    );
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, register, (state, action) => {
      state.user = action.payload.user;
    });
    handleAsyncThunk(builder, verifyEmail, (state, action) => {
      state.user = action.payload.user;
    });
    handleAsyncThunk(builder, login, (state, action) => {
      state.user = action.payload.user;
    });
    handleAsyncThunk(builder, isAuthenticated, (state, action) => {
      state.user = action.payload.user;
    });
    handleAsyncThunk(builder, logout, (state) => {
      state.user = null;
    });
    handleAsyncThunk(builder, forgotPassword);
    handleAsyncThunk(builder, resetPassword);
  },
});

export const { resetError } = authSlice.actions;
export const getUser = (state: RootState) => state.auth.user;
export const getStatus = (state: RootState) => state.auth.status;
export const getError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
