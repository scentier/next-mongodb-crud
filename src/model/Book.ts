import { Schema, model, models } from "mongoose";

const BookSchema = new Schema<TBook>(
  {
    title: String,
    slug: { type: String, unique: true },
    description: String,
    author: String,
    download: String,
    published: Number,
  },
  { timestamps: true }
);

// cek apakah sudah punya model book, jika belum buat model
const Book = models.Book || model("Book", BookSchema);

export default Book;
