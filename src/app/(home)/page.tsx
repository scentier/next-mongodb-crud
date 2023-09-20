import FreshBooks from "@/components/FreshBooks";
import { TBookObj } from "@/lib/types";
import httpService from "@/services/http-service";

export default async function Home() {
  const books = await httpService("/book").getData<TBookObj[]>();
  return (
    <main>
      <h1 className="text-4xl my-4 py-2 border-b-[1px] border-blue-500">
        Home
      </h1>
      <FreshBooks books={books} />
    </main>
  );
}
