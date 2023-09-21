import { TBookObj } from "@/lib/types";
import { siteName } from "@/lib/variables";
import Link from "next/link";

type Props = {
  book: TBookObj;
};

function getHostname(url: string) {
  const u = new URL(url);
  return u.hostname;
}

export default function BookDetail({ book }: Props) {
  return (
    <article>
      <header className="mt-10 mb-8 pt-4">
        <aside className="mb-2">
          <Link className="font-medium text-sm" href="/">
            {siteName}
          </Link>
          <span className="mx-1">{" > "}</span>
          <Link className="font-medium text-xs" href="/fresh">
            Books
          </Link>
          <span className="mx-1">{" > "}</span>
          <span className="font-light text-xs text-neutral-600">
            {book.title}
          </span>
        </aside>
        <h1 className="mb-3 text-4xl leading-snug font-semibold">
          {book.title}
        </h1>
        <div className="mb-2">
          Book by{" "}
          <span className="text-base underline underline-offset-4">
            {book.author}
          </span>
          , published at{" "}
          <span className="text-sm font-light">{book.published}</span>
        </div>
      </header>
      <div className="relative block mb-4">{book.description}</div>
      {typeof book.tags != "undefined" && book.tags.length > 0 ? (
        <p>
          tags:{" "}
          {book.tags.map((tag) => (
            <span key={tag}>{tag}, </span>
          ))}
        </p>
      ) : null}
      {book.url && (
        <p className="mb-4 font-light text-neutral-500">
          Link:{" "}
          <a
            className="text-orange-500 hover:underline hover:underline-offset-2 hover:text-orange-300"
            href={book.url}
          >
            {getHostname(book.url)}
          </a>
        </p>
      )}
    </article>
  );
}
