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
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    // to access result.data must be within result.success block
    const bookObj: TBook = result.data;
    const slug = slugify(bookObj.title);
    bookObj.slug = slug;
    console.log("route.ts>bookObj====", bookObj);
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}

export async function post_mongo(req: NextRequest, res: NextResponse) {
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
