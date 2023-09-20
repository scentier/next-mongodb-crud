import BookDetail from "@/components/BookDetail";
import { TBookObj } from "@/lib/types";
import httpService from "@/services/http-service";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const book: TBookObj = await httpService(`/book/${id}`).getData();

  return {
    title: book.title,
    description: `${book.title} [${book.published}] by ${book.author}`,
    robots: { index: true, follow: true, nocache: true },
    authors: [{ name: book.author }],
  };
}

export default async function BookId({ params: { id } }: Props) {
  const book: TBookObj = await httpService(`/book/${id}`).getData();
  return (
    <main>
      <BookDetail book={book} />
    </main>
  );
}
