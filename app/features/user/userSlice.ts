import { IUser } from "@/app/models/User";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser,updateUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
