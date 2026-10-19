"use client";

import Navbar from "../src/navbar";
import { useDispatch, useSelector } from "react-redux";
import type { Rootstate } from "@/lib/store";
import Link from "next/link";
import { Trash, ShoppingBasket } from "lucide-react";
import { AppDispatch } from "@/lib/store";
import { UseDispatch } from "react-redux";
import { deleteBook } from "@/features/cart/cartSlice";
export default function Shopping() {
  const cart = useSelector((state: Rootstate) => state.add.cart);
  const dispatch = useDispatch<AppDispatch>();
  const price = 100;
  const totalPrice = cart.length * 100;
  function handleDelete(key: string) {
    dispatch(
      deleteBook({
        key,
      }),
    );
  }
  return (
    <section className="h-screen bg-background">
      <div className="relative top-0">
        <Navbar />
      </div>
      <div className="flex flex-row pt-20 ">
        <div className="w-3/4">
          {cart.length === 0 ? (
            <p className="mt-20 mx-auto flex justify-center items-center">
              سبد خرید شما خالی است.
            </p>
          ) : (
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 ">
              {cart.map((book) => (
                <div
                  key={book.key}
                  className="flex justify-center items-center flex-col w-70 h-80 gap-5 text-center border-2 p-7 rounded-2xl mt-5 mx-auto hover-3d shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-xl hover:border-[#233F49]/40"
                >
                  <Link
                    key={book.key}
                    className="flex gap-10 flex-col h-full"
                    href={`/books/${book.key.split("/").pop()}`}
                  >
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                      alt={book.title}
                      width="200x"
                      height="200px"
                      className="rounded-xl drop-shadow-xl"
                    />
                  </Link>
                  <div className="flex justify-between flex-col gap-5">
                    <p className="w-40 line-clamp-1"> {book.title}</p>
                    <div className="flex flex-row justify-between">
                      <p>{price}$</p>
                      <button
                        className="text-secondary-foreground hover:text-red-800"
                        onClick={() => handleDelete(book.key)}
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-fit rounded-2xl bg-background p-6 md:p-7 text-secondary-foreground shadow-sm border w-1/4 flex mr-10 mt-auto mb-auto flex-col border-l-2">
          <div className="mb-8 flex items-center justify-between">
            <ShoppingBasket size={26} />
            <h2 className="text-xl font-bold">order </h2>
          </div>

          <div className="mb-6 flex items-center justify-between text-sm">
            <span className="text-secondary-foreground">each book price :</span>
            <span className="font-medium" dir="ltr">
              {price}$
            </span>
          </div>

          <div className="mb-6 flex items-center justify-between text-sm">
            <span className="text-secondary-foreground">count :</span>
            <span>{cart.length}</span>
          </div>

          <div className="border-t border-[#D3E0E0] pt-6">
            <div className="mb-7 flex items-center justify-between">
              <span className="font-bold"> total price :</span>
              <span className="text-2xl font-extrabold" dir="ltr">
                {totalPrice}$
              </span>
            </div>

            <button
              disabled={cart.length === 0}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-secondary-foreground px-5 py-4 font-bold text-secondary transition hover:bg-[#25382f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBasket size={21} />
              purchase
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
