import FreshBooks from "@/components/FreshBooks";
import httpService from "@/services/http-service";

export default async function Fresh() {
  const books = await httpService("/book").getData<TBook[]>();
  return <FreshBooks books={books} />;
}
