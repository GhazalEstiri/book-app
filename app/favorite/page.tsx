"use client";

import Navbar from "../src/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { AppDispatch } from "@/lib/store";
import { deleteFavorite } from "@/features/auth/authSlice";
import Link from "next/link";
import { Trash } from "lucide-react";
export default function favorite() {
  const favorite = useSelector((state: Rootstate) => state.favorite.book);
  const dispatch=useDispatch<AppDispatch>();
  function handleDelete(key:string) {
    dispatch(
      deleteFavorite({
        key
      })
    )
  }
  return (
    <section className="">
      <div className="relative top-0">
      <Navbar />
      </div>
      <div className="grid grid-cols-4">
        {favorite.map((book) => {
          return (
            <div
              key={book.key}
              className="flex justify-center items-center flex-col w-70 h-90 gap-5 text-center border-2 p-7 rounded-2xl mt-20 mx-auto hover-3d shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-xl hover:border-[#233F49]/40"
              href={`/books/${book.key.split("/").pop()}`}
            >
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
                width="200x"
                height="200px"
                className="rounded-xl drop-shadow-xl"
              />
              <p className="w-40 line-clamp-1"> {book.title}</p>
                <button className="bg-blue-300 p-2 hover:bg-red-800" onClick={()=>handleDelete(book.key)}>
                  <Trash />
                </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
