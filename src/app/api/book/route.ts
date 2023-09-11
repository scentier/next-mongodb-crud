import connectDb from "@/lib/connect-db";
import Book from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, author, download, published } = await req.json();
  await connectDb();
  await Book.create({ title, description, author, download, published });
  return NextResponse.json({ message: "New Book Added!" }, { status: 201 });
}
