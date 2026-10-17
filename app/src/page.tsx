"use client";

import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import Image from "next/image"
import type { AppDispatch, Rootstate } from "@/lib/store";
import { Search, Heart } from "lucide-react";
import { add } from "@/features/auth/authSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
function Apibook() {
  const [data, setData] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = 10;
  type Book = {
    title: string;
    key: string;
    cover_i?: number;
    subject?: string[];
  };
  // type Image = {
  //   key: string;
  //   value: string;
  //   size: string;
  // };
  const pageNumber = Array.from({ length: pages }, (v, i) => i + 1);

  const categories = [
    { lable: "All", value: "all" },
    { lable: "Psychology", value: "psychology" },
    { lable: "Horror", value: "horror" },
    { lable: "Fiction", value: "fiction" },
    { lable: "Fantasy", value: "fantasy" },
    { lable: "Love", value: "romance" },
    { lable: "History", value: "history" },
  ];
  const limit = 15;
  useEffect(() => {
    const response = async () =>
      // selectedCategory: string,
      // limit: number,
      {
        try {
          const offset = currentPage * limit;
          setLoading(true);
          const query = category === "all" ? "book" : `subject:${category}`;
          const res = await fetch(
            `https://openlibrary.org/search.json?q=${query}&fields=key,title,cover_i,subject&limit=${limit}&offset=${offset}`,
          );

          const data = await res.json();
          setData(data.docs ?? []);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    response();
  }, [category, currentPage]);
  console.log(data);

  const filteredBooks = data
    .filter((book) => book.cover_i)
    .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));

  const dispatch = useDispatch<AppDispatch>();

  const handleFavorite = (book: Book) => {
    dispatch(
      add({
        title: book.title,
        key: book.key,
        cover_i: book.cover_i,
      }),
    );
  };
  const favorites = useSelector((state: Rootstate) => state.favorite.book);
  return (
    <section className="pt-30 pr-20 pl-20">
      <div className="">
        <section className="relative flex justify-center items-center mx-auto h-100 w-full flex-col gap-5">
          <img
            src="fairytale-scene-coming-out-book.jpg"
            alt=""
            className="absolute w-full h-full object-center object-cover blur-[4px] rounded-2xl inset-0"
          />
          <h1 className="flex justify-center items-center font-extrabold relative z-10 text-white text-3xl text-shadow-xl">
            Discover Your Next Favorite Book
          </h1>
          <p className="flex justify-center items-center relative z-10 font-bold text-white w-100 text-center text-lg text-shadow-xl">
            Step into a world of stories, imagination, and endless
            possibilities. Explore fascinating books, discover new genres, and
            find the perfect story for your next adventure.
          </p>
          <p className="flex justify-center items-center font-extrabold text-2xl relative z-10 text-white w-100 text-center text-shadow-xl">
            Every book opens a new world.
          </p>
          <div className="relative z-10 max-w-550 border-2 border-[#1d436286] rounded-2xl  px-5 flex flex-row gap-6  bg-white justify-center items-center ">
            <Search className="text-[#1d436286]" />

            <input
              type="text"
              placeholder="What would you like to read today?"
              className="input outline-none border-none flex justify-center items-center mx-auto relative z-10 "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <div>
          <Carousel className="mx-auto w-full max-w-120 mt-20">
            <CarouselContent>
              {categories.map((item) => (
                <CarouselItem
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                  key={item.value}
                >
                  <button
                    key={item.value}
                    onClick={() => {
                      setCategory(item.value);
                      setCurrentPage(1);
                    }}
                    className={`cursor-pointer w-20 border-2 shadow-2xs p-10 rounded-xl  font-bold flex justify-center items-center mx-auto text-center ${category === item.value ? "btn bg-[#233F49] text-white" : "btn btn-outline"}`}
                  >
                    {item.lable}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-4 gap-5 place-items-center mt-30">
          <div className="flex w-52 flex-col gap-4 ">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      ) : data.length === 0 ? (
        <p className="text-center">کتابی پیدا نشد.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 place-items-center mt-20">
          {filteredBooks.map((book) => {
            const isFavorite = favorites.some((item) => item.key === book.key);
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
                  <div className="flex justify-between">
                    <p className="w-40 line-clamp-1"> {book.title}</p>
                    <button
                      onClick={() => handleFavorite(book)}
                      
                    >
                      <Heart fill={isFavorite? "#CA2A30":"none"} color={isFavorite?"#CA2A30":"currentColor"} />
                    </button>
                  </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="join flex justify-center items-center mb-5 max-w-50 mx-auto relative bottom-0 mt-20 bg-[#233F49]">
        {pageNumber.map((btn) => {
          return (
            <button
              key={btn}
              onClick={() => setCurrentPage(btn)}
              className={`cursor-pointer  join-item btn ${btn === currentPage && "btn-active"} p-2 md:p-5 `}
            >
              {btn}
            </button>
          );
        })}

        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              {pageNumber.map((btn) => {
                return (
                  <PaginationLink key={btn} onClick={() => setCurrentPage(btn)}>
                    {btn}
                  </PaginationLink>
                );
              })}
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </div>
    </section>
  );
}

export default Apibook;
