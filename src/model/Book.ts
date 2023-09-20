import { TBookModel } from "@/lib/types";
import { Schema, model, models } from "mongoose";

const schema = new Schema<TBookModel>(
  {
    title: String,
    slug: String,
    description: String,
    author: String,
    tags: [String],
    url: String,
    published: Number,
  },
  { timestamps: true }
);

// cek apakah sudah punya model book, jika belum buat model
const Book = models.Book || model("Book", schema);

export default Book;
