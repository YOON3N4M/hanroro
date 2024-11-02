"use client";

import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { Book } from "@/data/book";
import YouTube from "react-youtube";

interface BookItemProps {
  book: Book;
}

function BookItem(props: BookItemProps) {
  const { book } = props;
  const { title, author } = book;

  const link = `https://www.google.com/search?q=${author} ${title}`;

  return (
    <div className="flex gap-xs items-center relative">
      <NewTabAnchor href={link}>
        <div className="absolute size-full left-0 rounded-md top-0 bg-authentic-dark opacity-0 flex justify-center items-center"></div>
      </NewTabAnchor>
      <div>&#183;</div>
      <div className="mt-auto">
        <h2 className="text-ellipsis whitespace-nowrap max-w-[100%] overflow-hidden">
          {title}
        </h2>
        <span className="text-xs opacity-70">{author}</span>
      </div>
    </div>
  );
}

export default BookItem;
