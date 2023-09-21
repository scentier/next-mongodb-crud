"use client";
import { TZodBookSchema, zodBookSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  pageTitle: string;
};

export default function NewBook({ pageTitle }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TZodBookSchema>({ resolver: zodResolver(zodBookSchema) });

  const onSubmit = async (data: TZodBookSchema) => {
    const res = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();
    if (!res.ok) {
      alert("Submitting book failed!");
      return;
    }

    if (resData.success) {
      router.push("/fresh");
    }

    console.log("resData.message", resData.message);

    if (resData.errors) {
      const err = resData.errors;
      if (err.title) {
        setError("title", { type: "server", message: err.title });
      }
      if (err.description) {
        setError("description", { type: "server", message: err.description });
      }
      if (err.author) {
        setError("author", { type: "server", message: err.author });
      }
      if (err.published) {
        setError("published", { type: "server", message: err.published });
      }
      if (err.url) {
        setError("url", { type: "server", message: err.url });
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <>
      <h1 className="my-10 text-blue-300 text-4xl font-light drop-shadow-lg py-5 border-b-[1px] border-blue-500">
        {pageTitle}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 mt-10 w-full lg:w-3/5"
      >
        <div className="flex flex-col">
          <label className="text-blue-500 mb-1">Title</label>
          {errors.title && (
            <p className="text-red-400">{errors.title.message}</p>
          )}
          <input
            {...register("title")}
            className="border border-blue-500 rounded h-10 px-4 py-2"
            name="title"
            type="text"
            placeholder="Book Title"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-blue-500 mb-1">Description</label>
          {errors.description && (
            <p className="text-red-400">{errors.title?.message}</p>
          )}
          <textarea
            {...register("description")}
            className="h-full min-h-[100px] resize-none rounded-md border border-blue-500 px-4 py-2"
            name="description"
            placeholder="Book Description"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="text-blue-500 mb-1">Author</label>
          {errors.author && (
            <p className="text-red-400">{errors.author.message}</p>
          )}
          <input
            {...register("author")}
            className="px-4 py-2 rounded border border-blue-500"
            name="author"
            type="text"
            placeholder="Book Author"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-blue-500 mb-1">Published</label>
          {errors.published && (
            <p className="text-red-400">{errors.published.message}</p>
          )}
          <input
            {...register("published", { valueAsNumber: true })}
            className="px-4 py-2 rounded border border-blue-500"
            name="published"
            type="number"
            placeholder="Book's Year Published"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-blue-500 mb-1">URL</label>
          {errors.url && <p className="text-red-400">{errors.url.message}</p>}
          <input
            {...register("url")}
            className="px-4 py-2 rounded border border-blue-500"
            name="url"
            type="text"
            placeholder="Book URL"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 disabled:bg-gray-500 text-gray-100 px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}
