type Props = {
  book: TBookObj;
};

export default function BookDetail({ book }: Props) {
  return (
    <article>
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>
      <div className="content">{book.description}</div>
      {typeof book.tags != "undefined" && book.tags.length > 0 ? (
        <p>
          tags:{" "}
          {book.tags.map((tag) => (
            <span key={tag}>{tag}, </span>
          ))}
        </p>
      ) : null}
      <p>First published: {book.published}</p>
    </article>
  );
}
