import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: {
    title: "",
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
        title: "",
        location: "",
        jobType: "",
      };
    },
  },
});

export const { setSearchData, clearSearchData } = searchSlice.actions;

export default searchSlice.reducer;
