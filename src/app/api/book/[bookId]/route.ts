import connectDb from "@/lib/connect-db";
import { zodBookSchema } from "@/lib/types";
import Book from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

connectDb();

type Props = {
  params: { bookId: string };
};

export async function PUT(request: Request, { params: { bookId } }: Props) {
  let zodErrors = {};
  let statusMsg = {};
  try {
    const body: unknown = await request.json();
    const result = zodBookSchema.safeParse(body);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });
    } else {
      const updatedBook = result.data;
      await Book.findByIdAndUpdate(bookId, updatedBook);
      statusMsg = { ...statusMsg, message: "Book Updated!" };
    }
  } catch (error) {
    const err = error as Record<string, unknown>;
    statusMsg = { ...statusMsg, message: err.message };
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true, status: statusMsg }
  );
}

// export async function PUT(req: NextRequest, { params: { bookId } }: Props) {
//   const {
//     ttl: title,
//     slg: slug,
//     des: description,
//     aut: author,
//     dwl: download,
//     pub: published,
//   } = await req.json();

//   await Book.findByIdAndUpdate(bookId, {
//     title,
//     slug,
//     description,
//     author,
//     download,
//     published,
//   });
//   return NextResponse.json({ message: "update ok!" }, { status: 200 });
// }

export async function GET(req: NextRequest, { params: { bookId } }: Props) {
  const getBook = await Book.findOne({ _id: bookId });
  return NextResponse.json(getBook);
}
