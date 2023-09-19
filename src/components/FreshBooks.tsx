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
            {book.description && (
              <div>deskrpsi ======== {book.description}</div>
            )}
            {typeof book.slug != "undefined" && (
              <div>slug ========== {book.slug}</div>
            )}
            {!!book.author && <div>author =============== {book.author}</div>}
            {book.published && (
              <div>published ============= {book.published}</div>
            )}
            <div>{book.createdAt}</div>
            <div>{book.updatedAt}</div>
            {typeof book.tags != "undefined" && book.tags.length > 0 ? (
              <div>
                tags:
                {book.tags.map((tag) => (
                  <span key={tag}>{tag}, </span>
                ))}
              </div>
            ) : null}
            {book.url && <p>Link: {book.url}</p>}
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
