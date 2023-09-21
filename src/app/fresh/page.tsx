import FreshBooks from "@/components/FreshBooks";
import { TBookObj } from "@/lib/types";
import httpService from "@/services/http-service";
import { Metadata } from "next";

const pageTitle = "Get Your Fresh & Latest Book Here";
export const metadata: Metadata = {
  title: pageTitle,
  description: "Get the most fresh book in the world here",
};

export default async function Fresh() {
  const books = await httpService("/book").getData<TBookObj[]>();
  return <FreshBooks books={books} pageTitle={pageTitle} />;
}
