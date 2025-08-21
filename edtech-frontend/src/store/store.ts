import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/slice/userslice";
import problemReducer from "../feature/slice/problemslice";
import { apiSlice } from "../feature/slice/apislice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    problems: problemReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
