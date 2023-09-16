"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newBookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  author: z.string().min(3, "Author must be at least 3 characters"),
  published: z
    .number({ invalid_type_error: "invalid_type_error: Year must be numbers." })
    .min(687, "Year published must be at least 687"),
  link: z.string().min(3, "Link must be at least 3 characters"),
});

type TNewbookSchema = z.infer<typeof newBookSchema>;

export default function NewBook() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TNewbookSchema>({ resolver: zodResolver(newBookSchema) });

  const onSubmit = async (data: TNewbookSchema) => {
    console.log(data);
    // code to server
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
        <div className="flex flex-col">
          <label className="text-indigo-500 mb-1">Title</label>
          {errors.title && (
            <p className="text-red-400">{errors.title.message}</p>
          )}
          <input
            {...register("title")}
            className="border border-indigo-500 rounded h-10 px-4 py-2"
            name="title"
            type="text"
            placeholder="Book Title"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-500 mb-1">Description</label>
          {errors.description && (
            <p className="text-red-400">{errors.title?.message}</p>
          )}
          <textarea
            {...register("description")}
            className="h-full min-h-[100px] resize-none rounded-md border border-indigo-500 px-4 py-2"
            name="description"
            placeholder="Book Description"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-500 mb-1">Author</label>
          {errors.author && (
            <p className="text-red-400">{errors.author.message}</p>
          )}
          <input
            {...register("author")}
            className="px-4 py-2 rounded border border-indigo-500"
            name="author"
            type="text"
            placeholder="Book Author"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-500 mb-1">Published</label>
          {errors.published && (
            <p className="text-red-400">{errors.published.message}</p>
          )}
          <input
            {...register("published", { valueAsNumber: true })}
            className="px-4 py-2 rounded border border-indigo-500"
            name="published"
            type="number"
            placeholder="Book's Year Published"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-500 mb-1">Link</label>
          {errors.link && <p className="text-red-400">{errors.link.message}</p>}
          <input
            {...register("link")}
            className="px-4 py-2 rounded border border-indigo-500"
            name="link"
            type="text"
            placeholder="Book Link"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-500 disabled:bg-gray-500 text-gray-100 px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}
