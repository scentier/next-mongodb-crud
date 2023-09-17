import connectDb from "@/lib/connect-db";
import { slugify } from "@/lib/functions";
import { newBookSchema } from "@/lib/types";
import Book from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = newBookSchema.safeParse(body);

  let zodErrors = {};
  let statusMsg = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    // to access result.data must be within result.success block
    const bookObj: TBook = result.data;
    const slug = slugify(bookObj.title);
    bookObj.slug = slug;
    try {
      const isExist = await Book.findOne({ slug: slug });
      if (!isExist) {
        await Book.create(bookObj);
        statusMsg = { ...statusMsg, message: "New Book Added!" };
      } else {
        statusMsg = { ...statusMsg, message: "Book already exist!" };
      }
    } catch (error) {
      const err = error as Record<string, unknown>;
      statusMsg = { ...statusMsg, message: err.message };
    }
  }
  console.log("statusMsg route.ts:", statusMsg);

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true, message: statusMsg }
  );
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
