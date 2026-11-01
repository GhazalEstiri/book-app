import { configureStore } from "@reduxjs/toolkit";
import { authReducer, favoriteReducer } from "@/features/auth/authSlice";
import { addReducer } from "@/features/cart/cartSlice";
export const store = configureStore({
  reducer: { auth: authReducer, favorite: favoriteReducer, add: addReducer },
});
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
