import { slugify } from "@/lib/funcs";
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

// BookSchema.pre("save", function (this: TBook, next) {
//   this.slug = slugify(this.title);
//   next();
// });

// cek apakah sudah punya model book, jika belum buat model
const Book = models.Book || model("Book", BookSchema);

export default Book;
