import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ApplicationCounts = {
  all: number;
  accepted: number;
  rejected: number;
  new: number;
  pending: number;
  interview: number;
  reviewed: number;
};

type State = {
  applications: ApplicationCounts;
};

const initialState: State = {
  applications: {
    all: 0,
    accepted: 0,
    rejected: 0,
    new: 0,
    pending: 0,
    interview: 0,
    reviewed: 0,
  },
};

const applicationsCountSlice = createSlice({
  name: "applicationCount",
  initialState,
  reducers: {
    updateApplicationCount: (
      state,
      action: PayloadAction<ApplicationCounts>
    ) => {
      state.applications = action.payload;
    },
  },
});

export const { updateApplicationCount } = applicationsCountSlice.actions;
export default applicationsCountSlice.reducer;

export type { ApplicationCounts };