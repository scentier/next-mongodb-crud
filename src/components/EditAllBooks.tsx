import { TBookObj } from "@/lib/types";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

type Props = {
  books: TBookObj[];
  pageTitle: string;
};

function formatDateToString(date: string) {
  const d = new Date(date);
  return d.toDateString();
}

export default function EditAllBooks({ books, pageTitle }: Props) {
  return (
    <>
      <h1 className="my-10 text-blue-300 text-4xl font-light drop-shadow-lg py-5 border-b-[1px] border-blue-500">
        {pageTitle}
      </h1>
      <div className="container mx-auto">
        {books.map((book) => (
          <div
            className="relative mb-4 flex flex-col break-words bg-white border border-solid rounded-xl border-neutral-50 shadow-lg shadow-neutral-100 p-6"
            key={book._id}
          >
            <h2 className="text-2xl mb-2 hover:text-blue-400">
              <Link href={`/edit/${book._id}`}>Edit ~ {book.title}</Link>
            </h2>
            <div className="flex flex-row justify-between">
              <p className="text-neutral-400 text-xs">
                Last updated: {formatDateToString(book.updatedAt)}
              </p>
              <DeleteButton id={book._id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
