type Props = {
  books: TBookObj[];
};
export default function FreshBooks({ books }: Props) {
  // console.log(books);
  return (
    <>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <div>{book._id}</div>
            <div>{book.title}</div>
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
                  <span>{tag}, </span>
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
