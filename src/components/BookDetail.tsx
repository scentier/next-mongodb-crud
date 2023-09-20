import { TBookObj } from "@/lib/types";
import { siteName } from "@/lib/variables";
import Link from "next/link";

type Props = {
  book: TBookObj;
};

export default function BookDetail({ book }: Props) {
  return (
    <article>
      <header className="pt-4">
        <aside className="mb-3">
          <Link className="font-bold text-sm" href="/">
            {siteName}
          </Link>
          <span className="mx-1">{" > "}</span>
          <Link className="font-bold text-xs" href="/fresh">
            Books
          </Link>
          <span className="mx-1">{" > "}</span>
          <span className="text-xs text-neutral-600">{book.title}</span>
        </aside>
        <h1>{book.title}</h1>
        <div>
          {book.author}, {book.published}
        </div>
      </header>
      <div className="content">{book.description}</div>
      {typeof book.tags != "undefined" && book.tags.length > 0 ? (
        <p>
          tags:{" "}
          {book.tags.map((tag) => (
            <span key={tag}>{tag}, </span>
          ))}
        </p>
      ) : null}
      {book.url && <p>Link: {book.url}</p>}
    </article>
  );
}
