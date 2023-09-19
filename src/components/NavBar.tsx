import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <>
      <nav className="bg-blue-600 w-full py-2 text-xl" data-bs-theme="dark">
        <div className="container mx-auto text-slate-100 px-4">
          <Link href="/">Book Library</Link>
        </div>
      </nav>
    </>
  );
}
