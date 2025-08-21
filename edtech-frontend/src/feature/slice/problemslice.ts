import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "./apislice";
import { ChallengeResponse, ChallengeResponseWithoutPagination, Problem } from "../../types/type";

interface ProblemState {
  problems: Problem[];
  loading: boolean;
  error: string | null;
}

const initialState: ProblemState = {
  problems: [],
  loading: false,
  error: null,
};

const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    setProblems: (state, action: PayloadAction<Problem[]>) => {
      state.problems = action.payload;
    },
    clearProblem: (state, action: PayloadAction<string>) => {
      state.problems = state.problems.filter(
        (problem) => problem.titleSlug !== action.payload
      );
    },
  },
});

export const { setProblems, clearProblem } = problemSlice.actions;

// Extend API for problem endpoints
export const problemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChallenges: builder.query<ChallengeResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/challenge/getproblem`,
        params: { page, limit },
      }),
    }),
    getAllChallenges: builder.query<ChallengeResponseWithoutPagination, void>({
      query: () => ({
        url: `/challenge/getallproblem`,
      }),
    }),
  }),
});

export const { useGetChallengesQuery, useGetAllChallengesQuery } = problemApi;
export default problemSlice.reducer;
