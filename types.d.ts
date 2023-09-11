type TBookStr = Record<
  "title" | "description" | "slug" | "author" | "download",
  string
>;
type TBook = TBookStr & { published: number };
