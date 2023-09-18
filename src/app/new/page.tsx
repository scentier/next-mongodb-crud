import NewBook from "@/components/NewBook";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Book",
  description: "Don't be shy. Add new book here",
};

export default function NewPage() {
  return <NewBook />;
}
