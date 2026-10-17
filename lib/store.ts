import { configureStore } from "@reduxjs/toolkit";
import { authReducer, favoriteReducer } from "@/features/auth/authSlice";
export const store = configureStore({
  reducer: { auth: authReducer, favorite: favoriteReducer }
});
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
