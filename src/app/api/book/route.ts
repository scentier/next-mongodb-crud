import connectDb from "@/lib/connect-db";
import Book from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(req: NextRequest) {
  const { title, description, author, download, published } = await req.json();
  await Book.create({ title, description, author, download, published });
  return NextResponse.json({ message: "New Book Added!" }, { status: 201 });
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
