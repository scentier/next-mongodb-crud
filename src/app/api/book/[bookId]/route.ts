import connectDb from "@/lib/connect-db";
import Book from "@/model/Book";
import { NextRequest, NextResponse } from "next/server";

connectDb();

type Props = {
  params: { bookId: string };
};

export async function PUT(request: Request, { params: { bookId } }: Props) {
  try {
    const body = await request.json();
    console.log("body=======================", body);
    await Book.findByIdAndUpdate(bookId, body);
    return NextResponse.json({ message: "update ok!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "catch error" }, { status: 400 });
  }
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
