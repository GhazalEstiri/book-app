"use client";

import Navbar from "../src/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { AppDispatch } from "@/lib/store";
import { deleteFavorite } from "@/features/auth/authSlice";
import Link from "next/link";
import { Heart, Trash } from "lucide-react";
export default function favorite() {
  const favorite = useSelector((state: Rootstate) => state.favorite.book);
  const dispatch=useDispatch<AppDispatch>();
  const price = 100;
  function handleDelete(key:string) {
    dispatch(
      deleteFavorite({
        key
      })
    )
  }
  return (
    <section className="bg-background h-screen">
      <div className="relative top-0">
      <Navbar />
      </div>
       <div className="flex flex-row items-center justify-center text-center  pt-25 p-5">
            <p className=" flex font-bold text-3xl w-100 ml-5 mb-10 items-center gap-5">
              <Heart size={50} /> Features books
            </p>
            <div className="bg-secondary-foreground w-full h-[2px]"></div>
          </div>
      <div className="grid grid-cols-4">
        {favorite.map((book) => {
          return (
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
          );
        })}
      </div>
    </section>
  );
}
