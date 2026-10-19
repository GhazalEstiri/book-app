import { createSlice } from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
type User = {
  name: string;
  email: string;
  password: string;
};
type AuthState = {
  user: User | null;
};
type Book = {
  title: string;
  key: string;
  cover_i?: number;
};
type Favorite = {
  book: Book[];
};
const initialState: AuthState = {
  user: null,
};
const initialFavorite: Favorite = {
  book: [],
};
export const authSlice = createSlice({
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

export const favorite = createSlice({
  name: "favorite",
  initialState: initialFavorite,
  reducers: {
    add: (state, action) => {
      const exist = state.book.some((book) => book.key === action.payload.key);
      if (!exist) {
        state.book.push(action.payload);
      }
    },
    localBook:(state,action:PayloadAction<Book[]>)=>{
      state.book===action.payload;
    },
    deleteFavorite:(state,action:PayloadAction<{key:string}>)=>{
      state.book=state.book.filter((book)=>book.key!==action.payload.key)
    }
  },
});
export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const { add,localBook,deleteFavorite } = favorite.actions;
export const favoriteReducer = favorite.reducer;
