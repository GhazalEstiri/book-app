"use client";

import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import Image from "next/image"
import type { AppDispatch, Rootstate } from "@/lib/store";
import { Search, Heart, ShoppingBasket } from "lucide-react";
import { add } from "@/features/auth/authSlice";
import { addBook } from "@/features/cart/cartSlice";
import { BookOpenText, ListSortDescending } from "lucide-react";
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
import { section } from "motion/react-client";
function Apibook() {
  const [data, setData] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = 10;
  const price = 100;
  type Book = {
    title: string;
    key: string;
    cover_i?: number;
    subject?: string[];
    price: number;
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
  const handleShop = (book: Book) => {
    dispatch(
      addBook({
        title: book.title,
        key: book.key,
        cover_i: book.cover_i,
        subject: book.subject,
        price: price,
      }),
    );
  };
  const favorites = useSelector((state: Rootstate) => state.favorite.book);
  const cart = useSelector((state: Rootstate) => state.add.cart);

  return (
    <section className="pt-30 pr-20 pl-20 bg-background text-primary">
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
          <div className="relative z-10 w-full max-w-100 py-1 px-4 border-2 border-secondary-foreground rounded-xl flex items-center gap-3 bg-background">
            <Search className="text-secondary-foreground shrink-0" />

            <input
              type="text"
              placeholder="What would you like to read today?"
              className="input flex-1 min-w-0 outline-none border-none shadow-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <div>
          <div className="flex flex-row items-center justify-center text-center mt-20">
            <p className=" flex font-bold text-3xl w-100 ml-5 mb-10 items-center gap-5">
              <ListSortDescending size={50} /> Categories
            </p>
            <div className="bg-secondary-foreground w-full h-[2px]"></div>
          </div>
          <Carousel className="mx-auto w-full max-w-220 mt-10">
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
                    className={`cursor-pointer w-20 border-2 border-secondary-foreground shadow-2xs px-15 py-5 rounded-lg font-bold flex justify-center items-center mx-auto text-center ${
                      category === item.value
                        ? "bg-secondary-foreground text-secondary"
                        : "bg-background text-secondary-foreground"
                    }`}
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 place-items-center mt-30">
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
        </div>
      ) : data.length === 0 ? (
        <p className="text-center mt-20 font-bold text-4xl">Nothing found</p>
      ) : (
        <section className="flex flex-col mt-10">
          <div className="flex flex-row items-center justify-center text-center">
            <p className=" flex font-bold text-3xl w-100 ml-5 mb-10 items-center gap-5">
              <BookOpenText size={50} /> Features books
            </p>
            <div className="bg-secondary-foreground w-full h-[2px]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
            {filteredBooks.map((book) => {
              const isFavorite = favorites.some(
                (item) => item.key === book.key,
              );
              const isShopped = cart.some((item) => item.key === book.key);
              return (
                <div
                  key={book.key}
                  className="flex justify-center items-center flex-col w-65 h-90 gap-5 text-center border-2 p-7 rounded-xl mt-5 mx-auto hover-3d shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-xl hover:border-secondary-foreground/40"
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
                  <div className="flex justify-between flex-col gap-10">
                    <div className="flex flex-col gap-5">
                      <p className="w-40 line-clamp-1"> {book.title}</p>
                      <div className="flex flex-row justify-between ">
                        <button onClick={() => handleFavorite(book)}>
                          <Heart
                            fill={isFavorite ? "#CA2A30" : "none"}
                            color={isFavorite ? "#CA2A30" : "currentColor"}
                          />
                        </button>
                        <p>{price}$</p>

                        <button onClick={() => handleShop(book)}>
                          <ShoppingBasket
                            fill={isShopped ? "#344E41" : "none"}
                            color={isShopped ? "#344E41" : "currentColor"}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="join flex justify-center items-center  max-w-50 mx-auto relative bottom-0 mt-20 bg-[#233F49] ">
        {pageNumber.map((btn) => {
          return (
            <button
              key={btn}
              onClick={() => setCurrentPage(btn)}
              className={`cursor-pointer bg-background join-item text-secondary-foreground btn ${btn === currentPage && "btn-active "} p-2 md:p-5 `}
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
