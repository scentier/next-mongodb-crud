# MongoDB Next.js CRUD

model relationship

- a book can has many grenres, tags, authors
- an author can has many books
- a tag can has many books
- a genre can has many books

```js
// example book document
{
    author: [one or many authors],
    tags: [one or many tags],
    genres: [one or many genres],
}
```
