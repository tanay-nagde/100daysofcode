import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "./apislice";
import { User } from "../../types/type";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    updateUserField: (
      state,
      action: PayloadAction<Partial<User>>
    ) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.loading = false;
        state.error = null;
      }
    },
  
  },
});

export const { setUser, clearUser , updateUserField } = userSlice.actions;

// Extend API for user endpoints
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => "/user/me",
    }),
    getUserByEmail: builder.query<User, string>({
      query: (email) => `/users/email/${email}`,
    }),
  }),
});

export const { useGetMeQuery, useGetUserByEmailQuery } = userApi;
export default userSlice.reducer;
