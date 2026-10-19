"use client";
import { useEffect, useState } from "react";
import Navbar from "@/app/src/navbar";
import {
  BookOpenText,
  CalendarDays,
  LoaderCircle,
  Users,
  User,
  Banknote,
  Truck,
  Undo2,
  ShieldCheck,
} from "lucide-react";
type Props = {
  bookTitle: string;
};
type Book = {
  title: string;
  key: string;
  covers: number[];
  description:
    | string
    | {
        value: string;
      }
    | null;
  created: {
    value: string;
  };
  subject_people: string[];
  latest_revision: number;
  authors: {
    author: { key: string };
  }[];
  price: number;
};
type Author = {
  name: string;
};
const price = 100;
export default function DetailBook({ bookTitle }: Props) {
  const [books, setBook] = useState<Book | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  useEffect(() => {
    async function getBook() {
      const result = await fetch(
        `https://openlibrary.org/works/${bookTitle}.json`,
      );
      const data = await result.json();
      setBook(data);
      console.log(data);
      console.log(bookTitle);
      console.log(result.status);
      const authors = data?.authors[0].author?.key;
      const resultAthor = await fetch(`https://openlibrary.org${authors}.json`);
      const dataAthor = await resultAthor.json();
      setAuthor(dataAthor);
    }
    // async function getAuthors() {
    // }
    getBook();
    // getAuthors();
  }, [bookTitle]);
  return (
    <div className="h-screen">
      <Navbar />
      <div
        key={books?.key}
        className="flex flex-1 flex-col mx-auto justify-center items-center w-full pt-20 pl-20 pr-20 gap-5"
      >
        <div className="flex flex-1 mx-auto gap-10 items-center w-full bg-[#F2F2F2] p-5 rounded-2xl justify-between">
          <div className="flex flex-row gap-10 items-center w-1/2">
            <img
              src={`https://covers.openlibrary.org/b/id/${books?.covers[0]}-L.jpg`}
              alt={books?.title}
              width="220px"
              height="220px"
              className="rounded-2xl"
            />
            <div className="flex flex-1 flex-col  gap-3 h-auto justify-center border-r-2">
              <div className="bg-[#9898985c] w-fit px-4 py-2 rounded-2xl flex gap-2 flex-row">
                <p>
                  <BookOpenText />
                </p>
                <p>Book</p>
              </div>
              <div className="flex gap-5 flex-col">
                <p className="font-extrabold text-4xl  flex flex-row items-center gap-2">
                  {books?.title}
                </p>
                <p className="font-bold  text-[#242222] flex flex-row items-center gap-4">
                  <User size={40} className="rounded-full bg-[#9898985c] p-2" />{" "}
                  {author?.name}
                </p>
              </div>
              <div className="flex flex-1 flex-col rounded-2xl gap-1">
                <div className="flex flex-row items-center gap-5">
                  <p className="bg-[#9898985c] w-fit p-2 rounded-full flex gap-2 flex-row text-xl">
                    <CalendarDays />
                  </p>
                  <div>
                    <h1 className="font-bold ">created</h1>
                    <p>{books?.created.value}</p>
                  </div>
                </div>
                <div>
                  {books?.subject_people ? (
                    <div className="flex flex-row items-center gap-5">
                      <p className="bg-[#9898985c] w-fit p-2 rounded-full  flex gap-2 flex-row text-xl">
                        <Users />
                      </p>
                      <div>
                        <h1 className="font-bold">subject people</h1>
                        <p>{books?.subject_people}</p>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>

                <div className="flex flex-row items-center gap-5">
                  <p className="bg-[#9898985c] w-fit p-2 rounded-full  flex gap-2 flex-row text-xl">
                    <LoaderCircle />
                  </p>
                  <div>
                    <h1 className="font-bold text-xl">latest revision</h1>
                    <p>{books?.latest_revision}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1  bg-[#F2F2F2] p-5 rounded-2xl flex-col gap-8 w-1/2 ">
            <div className="flex flex-row gap-4 items-center mx-auto">
              <p className="">
                <Banknote size={40} />
              </p>
              <h1 className="font-bold text-3xl">Purchase Information</h1>
            </div>
            <p className="font-bold text-xl mx-auto">Price: {price}$</p>
            <button className="bg-[#9898985c] w-[70%] px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#9b9b9b]  mx-auto ">
              Purchase
            </button>
            <div className="flex flex-row justify-center gap-10">
              <div className="flex flex-row gap-5 items-center">
                <p>
                  <Truck />
                </p>
                <div>
                  <h1 className="font-bold text-xl"> Free shipping</h1>
                  <p>for orders over $50</p>
                </div>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <p>
                  <ShieldCheck />
                </p>
                <div>
                  <h1 className="font-bold text-xl">Secure payment</h1>
                  <p> 100% secure checkout</p>
                </div>
              </div>
              <div className="flex flex-row gap-5 items-center ">
                <p>
                  <Undo2 />
                </p>
                <div>
                  <h1 className="font-bold text-xl"> 30 days return</h1>
                  <p>Hassle free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-row mx-auto justify-center w-full gap-5">
          <div className="flex flex-1 bg-[#F2F2F2] p-5 rounded-2xl flex-col gap-5">
            <div className="flex flex-row gap-4 items-center">
              <p className="">
                <BookOpenText size={40} />
              </p>
              <h1 className="font-bold text-3xl">Description</h1>
            </div>
            <p className="h-50 overflow-y-auto">
              {typeof books?.description === "string"
                ? books.description
                : books?.description?.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
