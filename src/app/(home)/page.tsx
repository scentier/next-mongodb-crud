import FreshBooks from "@/components/FreshBooks";
import { TBookObj } from "@/lib/types";
import httpService from "@/services/http-service";

export default async function Home() {
  const books = await httpService("/book").getData<TBookObj[]>();
  const pageTitle = "Huge Library for You";
  return (
    <>
      <FreshBooks books={books} pageTitle={pageTitle} />
    </>
  );
}
