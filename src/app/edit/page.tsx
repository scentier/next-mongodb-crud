import EditAllBooks from "@/components/EditAllBooks";
import { TBookObj } from "@/lib/types";
import httpService from "@/lib/http-service";
import { Metadata } from "next";

const pageTitle = "Edit All Books";
export const metadata: Metadata = {
  title: pageTitle,
  description: "Fix things within books",
};

export default async function EditAll() {
  const books = await httpService("/book").getData<TBookObj[]>();
  return <EditAllBooks books={books} pageTitle={pageTitle} />;
}
