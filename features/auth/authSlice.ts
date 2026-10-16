import { createSlice } from "@reduxjs/toolkit";
type User = {
  name: string;
  email: string;
  password: string;
};
type AuthState = {
  user: User | null;
};
const initialState: AuthState = {
  user: null,
};
const authSlice = createSlice({
      name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { login, logout}= authSlice.actions
export default authSlice.reducer
