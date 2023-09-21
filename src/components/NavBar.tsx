import Link from "next/link";
import { IoLibrarySharp } from "react-icons/io5";

export default function NavBar() {
  return (
    <>
      <nav className="bg-blue-600 w-full py-2 text-xl" data-bs-theme="dark">
        <div className="container mx-auto text-slate-100 px-4 py-2 flex justify-between">
          <Link href="/" className="flex flex-row space-x-2 w-1/3 lg:w-1/5">
            <IoLibrarySharp size={30} />{" "}
            <span className="mt-1">Book Library</span>
          </Link>
          <div className="flex justify-end mt-1 space-x-2 w-2/3 lg:w-4/5">
            <Link
              className="font-light underline underline-offset-4"
              href="/fresh"
            >
              Fresh
            </Link>
            <Link
              className="font-light underline underline-offset-4"
              href="/new"
            >
              Add Book
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
