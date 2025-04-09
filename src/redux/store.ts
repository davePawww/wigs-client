import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/redux/slices/authSlice";
import wigsReducer from "@/redux/slices/wigsSlice";

const wigsPersistConfig = {
  key: "wigs",
  storage,
  whitelsit: ["wigs"],
};

const persistedWigsReducer = persistReducer(wigsPersistConfig, wigsReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wigs: persistedWigsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
