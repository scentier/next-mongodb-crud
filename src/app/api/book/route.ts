import connectDb from "@/lib/connect-db";
import { slugify } from "@/lib/functions";
import Book from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(req: NextRequest, res: NextResponse) {
  const bookObj: TBook = await req.json();
  const slug = slugify(bookObj.title);
  bookObj.slug = slug;
  try {
    const isExist = await Book.findOne({ slug: slug });
    if (!isExist) {
      await Book.create(bookObj);
      return NextResponse.json(
        { message: "Add success!", data: bookObj },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "exist!", data: bookObj });
    }
  } catch (error) {
    const e = error as Record<string, unknown>;
    return NextResponse.json({ message: e.message, data: bookObj });
  }
}

export async function GET() {
  const getBooks = await Book.find();
  return NextResponse.json(getBooks);
}

export async function DELETE(req: NextRequest) {
  const bookId = req.nextUrl.searchParams.get("deleteId");
  await Book.findByIdAndDelete(bookId);
  return NextResponse.json({ message: "Book Deleted!" }, { status: 200 });
}
