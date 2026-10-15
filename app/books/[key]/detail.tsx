"use client";
import { useEffect, useState } from "react";

type Props = {
  bookTitle: string;
};
type Book = {
  title: string;
  key: string;
  cover_i?: number[];
  
};
type Docs = {
  docs: Book[];
};
export default function DetailBook({ bookTitle }: Props) {
  const [books, setBook] = useState<Book[] | null>(null);
  useEffect(() => {
    async function getBook() {
      const result = await fetch(
        // `https://openlibrary.org/search.json?q=${bookTitle}.json`,
        // `https://openlibrary.org/work/${bookTitle}.json`,
        // { mode: "no-cors"},
        `https://openlibrary.org/search.json?title=${encodeURIComponent(bookTitle)}`,
      );
      const data: Docs = await result.json();
      setBook(data.docs ?? null);
      console.log(data);
      console.log(bookTitle);
      console.log(result.status);
    }
    getBook();
  }, [bookTitle]);
  return (
    <div>
      {books?.map((book) => {
        return (
          <div key={book.key}>
            <p>{book.title}</p>
            <img
              src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`}
              alt={book.title}
              width={100}
              height={100}
            />
          </div>
        );
      })}
    </div>
  );
}
