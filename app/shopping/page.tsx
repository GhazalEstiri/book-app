"use client";

import Navbar from "../src/navbar";
import { useDispatch, useSelector } from "react-redux";
import type { Rootstate } from "@/lib/store";
import Link from "next/link";
import { Trash } from "lucide-react";
import { AppDispatch } from "@/lib/store";
import { UseDispatch } from "react-redux";
import { deleteBook } from "@/features/cart/cartSlice";
export default function Shopping() {
  const cart = useSelector((state: Rootstate) => state.add.cart);
  const dispatch = useDispatch<AppDispatch>();
  const price = 100;
  const totalPrice = cart.length*100
  function handleDelete(key:string) {
    dispatch(
      deleteBook({
        key
      }),
    );
  }
  return (
    <section>
      <div className="relative top-0">
        <Navbar />
      </div>
      <div className="flex flex-col pt-20 ">
        {cart.length === 0 ? (
          <p className="mt-20 mx-auto flex justify-center items-center">
            سبد خرید شما خالی است.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 ">
            {cart.map((book) => (
              <div
                key={book.key}
                className="flex justify-center items-center flex-col w-65 h-90 gap-5 text-center border-2 p-7 rounded-2xl mt-5 mx-auto hover-3d shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-xl hover:border-[#233F49]/40"
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
                <div className="flex justify-between flex-col">
                  <p>{price}$</p>
                  <div className="flex flex-row">
                    <p className="w-40 line-clamp-1"> {book.title}</p>
                  </div>
                </div>
                <button className="bg-blue-300 p-2 hover:bg-red-800" onClick={()=>handleDelete(book.key)}>
                  <Trash />
                </button>
              </div>
            ))}
            <p>{totalPrice}</p>
          </div>
        )}
      </div>
    </section>
  );
}
