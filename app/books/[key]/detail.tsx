"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/shadcn-space/card/card-24";
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
      {/* <EventCard> */}
        <div key={books?.key}>
          <p>{books?.title}</p>
          <img
            src={`https://covers.openlibrary.org/b/id/${books?.covers[2]}-L.jpg`}
            alt={books?.title}
            width={100}
            height={100}
          />
          <p>
            {typeof books?.description === "string"
              ? books.description
              : books?.description.value}
          </p>
          <p>{books?.created.value}</p>
          <p>{books?.subject_people}</p>
          <p>{books?.latest_revision}</p>
          <p>{author?.name}</p>
        </div>
      {/* </EventCard> */}
    </div>
  );
}
