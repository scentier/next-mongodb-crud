import httpService from "@/lib/http-service";
import { Metadata } from "next";
import { TZodBookSchema, zodBookSchema } from "@/lib/types";
import EditBook from "@/components/EditBook";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const res: unknown = await httpService(`/book/${id}`).getData();
  const book = zodBookSchema.parse(res);

  return {
    title: `Edit: ${book.title}`,
    description: `${book.title} [${book.published}] by ${book.author}`,
    robots: { index: true, follow: true, nocache: true },
    authors: [{ name: book.author }],
  };
}

const urlEndpoint = httpService(`/book`).endpoint;
console.log("url endpoint", urlEndpoint);

export default function EditId({ params: { id } }: Props) {
  return <EditBook bookId={id} />;
}
