import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Key } from "react";
type Book = {
  title: string;
  key: string;
  cover_i?: number;
  subject?: string[];
  price: number;
};

type Cart = {
  cart: Book[];
};
const initialState: Cart = {
  cart: [],
};
export const shoppingCart = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const exist = state.cart.some((book) => book.key === action.payload.key);
      if (!exist) {
        state.cart.push(action.payload);
      }
    },
    deleteBook: (state, action:PayloadAction<{key:string}>) => {
      state.cart = state.cart.filter((book) => book.key !== action.payload.key);
    },
    localCart: (state, action: PayloadAction<Book[]>) => {
      state.cart = action.payload;
    },
  },
});
export const { addBook, localCart,deleteBook } = shoppingCart.actions;
export const addReducer = shoppingCart.reducer;
