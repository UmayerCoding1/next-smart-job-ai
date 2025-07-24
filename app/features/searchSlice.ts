import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: {
    jobTitle: "",
    location: "",
    jobType: "",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.search = action.payload;
    },
    clearSearchData: (state) => {
      state.search = {
        jobTitle: "",
        location: "",
        jobType: "",
      };
    },
  },
});

export const { setSearchData, clearSearchData } = searchSlice.actions;

export default searchSlice.reducer;
