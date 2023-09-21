import NewBook from "@/components/NewBook";
import { Metadata } from "next";

const pageTitle = "Add New Book";

export const metadata: Metadata = {
  title: pageTitle,
  description: "Don't be shy. Add new book here",
};

export default function NewPage() {
  return <NewBook pageTitle={pageTitle} />;
}
