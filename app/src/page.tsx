"use client";

import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
          const offset = (currentPage - 1) * limit;
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

  return (
    <section className="pt-30">
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="input input-primary flex justify-center items-center mx-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <Carousel className="mx-auto w-full max-w-4xl">
            <CarouselContent>
              {categories.map((item) => (
                <CarouselItem
                  className="basis-1/3 md:basis-1/4 lg:basis-1/5"
                  key={item.value}
                >
                  <button
                    key={item.value}
                    onClick={() => {
                      setCategory(item.value);
                      setCurrentPage(1);
                    }}
                    className="btn btn-primary"
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
        <div className="grid grid-cols-4 gap-5 place-items-center">
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
        <div className="grid grid-cols-3  place-items-center">
          {filteredBooks.map((book) => (
            <Link
              key={book.key}
              className="flex justify-center items-center flex-col pt-20 gap-5 text-center"
              href={`/books/${book.key.split("/").pop()}`}
            >
              <p className="w-60 line-clamp-1"> {book.title}</p>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
                width={100}
                height={100}
              />
            </Link>
          ))}
        </div>
      )}
      <div className="join flex justify-center items-center mb-5 -mt-10 max-w-50 mx-auto relative bottom-0">
        {pageNumber.map((btn) => {
          return (
            <button
              key={btn}
              onClick={() => setCurrentPage(btn)}
              className={`join-item btn ${btn === currentPage && "btn-active"} p-2 md:p-5`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Apibook;
