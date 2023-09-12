type Props = {
  books: TBook[];
};
export default function FreshBooks({ books }: Props) {
  return (
    <>
      <div>
        {books.map((book) => (
          <div key={book.slug}>{book.title}</div>
        ))}
      </div>
    </>
  );
}
