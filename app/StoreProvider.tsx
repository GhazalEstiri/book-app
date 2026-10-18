"use client";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { favorite } from "@/features/auth/authSlice";
import { localCart } from "@/features/cart/cartSlice";

const STORAGE_KEY = "book-app-data";

import { store } from "@/lib/store";
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        const data = JSON.parse(savedData);

        if (Array.isArray(data.favorites)) {
          store.dispatch(favorite.actions.localBook(data.favorites));
        }

        if (Array.isArray(data.cart)) {
          store.dispatch(localCart(data.cart));
        }
      }
    } catch {
      console.error("Failed to load saved data");
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          favorites: state.favorite.book,
          cart: state.add.cart,
        }),
      );
    });

    return unsubscribe;
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
