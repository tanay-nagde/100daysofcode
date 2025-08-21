import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api",  credentials: "include", }), // Replace with actual API
  endpoints: () => ({}), // Empty, will be extended by slices
});
