import connectDb from "@/lib/connect-db";
import { slugify } from "@/lib/funcs";
import Book from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

connectDb();

// export async function POST(req: NextRequest) {
//   const { title, description, author, download, published } = await req.json();
//   await Book.create({ title, description, author, download, published });
//   return NextResponse.json({ message: "New Book Added!" }, { status: 201 });
// }

export async function POST(req: NextRequest, res: NextResponse) {
  const bookObj: TBook = await req.json();
  const slug = slugify(bookObj.title);
  // const slug = "create-a-nextjs-13-crud-app-with-mongodb";
  try {
    const isExist = await Book.findOne({ slug: slug });
    if (!isExist) {
      await Book.create(bookObj);
      return NextResponse.json({ message: "Add success!" }, { status: 201 });
    }
  } catch (error) {
    const e = error as Record<string, unknown>;
    console.log("error+++++++++++++++++++++++++", e.message);
    return NextResponse.json({ message: e.message });
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
