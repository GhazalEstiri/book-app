"use client";
import { useEffect, useState } from "react";
import Navbar from "@/app/src/navbar";
import { BookOpenText, CalendarDays, LoaderCircle, Users } from "lucide-react";
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
      };
  created: {
    value: string;
  };
  subject_people: string[];
  latest_revision: number;
  authors: {
    author: { key: string };
  }[];
};
type Author = {
  name: string;
};
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
    <div>
      <Navbar />
      <div
        key={books?.key}
        className="flex flex-1 flex-col mx-auto justify-center items-center w-full pt-20 pl-20 pr-20 gap-5"
      >
        <div className="flex flex-1 mx-auto justify-center gap-10 items-center w-full bg-[#F2F2F2] p-5 rounded-2xl">
          <img
            src={`https://covers.openlibrary.org/b/id/${books?.covers[2]}-L.jpg`}
            alt={books?.title}
            width="220px"
            height="220px"
            className="rounded-2xl"
          />
          <div className="flex flex-col  gap-5">
            <p className="font-extrabold text-6xl">{books?.title}</p>
            <p className="font-bold text-3xl text-[#242222]">{author?.name}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-row mx-auto justify-center items-center w-full gap-5">
          <div className="flex flex-1 bg-[#F2F2F2] p-5 rounded-2xl flex-col gap-5">
            <div className="flex flex-row gap-4 items-center">
              <p className="">
                <BookOpenText size={40} />
              </p>
              <h1 className="font-bold text-4xl">Description</h1>
            </div>
            <p>
              {typeof books?.description === "string"
                ? books.description
                : books?.description.value}
            </p>
          </div>
          <div className="flex flex-1 flex-col bg-[#F2F2F2] p-5 rounded-2xl gap-8">
            <div className="flex flex-row items-center gap-5">
              <CalendarDays />
              <div>
                <h1 className="font-bold text-xl">created</h1>
                <p>{books?.created.value}</p>
              </div>
            </div>
            <div>
              {books?.subject_people ? (
                <div className="flex flex-row items-center gap-5">
                  <Users />{" "}
                  <div>
                    <h1 className="font-bold text-xl">subject people</h1>
                    <p>{books?.subject_people}</p>
                  </div>
                </div>
              ) : (
                <p></p>
              )}
            </div>

            <div className="flex flex-row items-center gap-5">
              <LoaderCircle />
              <div>
                <h1 className="font-bold text-xl">latest revision</h1>
                <p>{books?.latest_revision}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
