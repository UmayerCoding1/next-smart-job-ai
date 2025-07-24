import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  JobType: [],
  DatePosted: [],
  ExperienceLavel: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setJobTypeFilterQuery: (state, action) => {
      state.JobType = action.payload;
    },
    setExperienceLavelFilterQuery: (state, action) => {
      state.ExperienceLavel = action.payload;
    },
    setDatePostedFilterQuery: (state, action) => {
      state.DatePosted = action.payload;
    },
    clearFilterQuery: (state) => {
      state.JobType = initialState.JobType;
    },
  },
});

export const { setJobTypeFilterQuery,setDatePostedFilterQuery, setExperienceLavelFilterQuery, clearFilterQuery } = filterSlice.actions;
export default filterSlice.reducer;
