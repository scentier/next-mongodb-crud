import Link from "next/link";

type Props = {
  books: TBookObj[];
};
export default function FreshBooks({ books }: Props) {
  return (
    <>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <Link href={book._id}>{book.title}</Link>
            <div>{book.description}</div>
            <div>{book.slug}</div>
            <div>{book.author}</div>
            <div>{book.published}</div>
            <div>{book.createdAt}</div>
            <div>{book.updatedAt}</div>
            {book.tags.length > 0 && (
              <div>
                tags:
                {book.tags.map((tag) => (
                  <span key={tag}>{tag}, </span>
                ))}
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
