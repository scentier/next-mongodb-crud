"use client";

import { postNewBook } from "@/actions/actions";

export default function FormBook() {
  // const handleSubmit = (event: FormEvent) => {
  //     event.preventDefault();

  // }
  return (
    <form action={postNewBook}>
      <input type="text" name="title" placeholder="Book Title" />
      <textarea name="description" placeholder="Book Description" />
      <input type="text" name="author" placeholder="Author" />
      <input type="text" name="url" placeholder="Link" />
      <input type="number" name="published" placeholder="Year Published" />
      <button type="submit">Submit</button>
    </form>
  );
}
