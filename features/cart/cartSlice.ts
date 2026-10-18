import { createSlice } from "@reduxjs/toolkit";
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
const shoppingCart = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const exist = state.cart.some((book) => book.key === action.payload.key);
      if (!exist) {
        state.cart.push(action.payload);
      }
    },
  },
});
export const { addBook } = shoppingCart.actions;
export const addReducer = shoppingCart.reducer