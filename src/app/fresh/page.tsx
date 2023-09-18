import FreshBooks from "@/components/FreshBooks";
import httpService from "@/services/http-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fresh Book",
  description: "Get the most fresh book in the world here",
};

export default async function Fresh() {
  const books = await httpService("/book").getData<TBook[]>();
  return <FreshBooks books={books} />;
}
