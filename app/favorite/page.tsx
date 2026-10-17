"use client";

import Navbar from "../src/navbar";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import Link from "next/link";
export default function favorite() {
  const favorite = useSelector((state: Rootstate) => state.favorite.book);
  return (
    <section className="">
      <div className="relative top-0">
      <Navbar />
      </div>
      <div className="grid grid-cols-4">
        {favorite.map((book) => {
          return (
            <Link
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
            </Link>
          );
        })}
      </div>
    </section>
  );
}
