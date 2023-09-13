import BookDetail from "@/components/BookDetail";
import httpService from "@/services/http-service";

type Props = {
  params: { id: string };
};

export default async function BookId({ params: { id } }: Props) {
  const book: TBookObj = await httpService(`/book/${id}`).getData();
  return (
    <main>
      <BookDetail book={book} />
    </main>
  );
}
