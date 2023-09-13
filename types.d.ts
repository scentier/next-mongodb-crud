type TBookStr = Record<
  "title" | "description" | "slug" | "author" | "download" | "url",
  string
>;

type TTags = {
  tags: string[];
};

type TbookNum = { published: number };

type TBook = TBookStr & TbookNum & TTags;

type TMongoObj = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type TBookObj = TMongoObj & TBook;
