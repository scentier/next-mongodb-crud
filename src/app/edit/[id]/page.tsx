"use client";
import { TNewbookSchema, newBookSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
// import httpService from "@/services/http-service";
import { useForm } from "react-hook-form";

type Props = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Edit Book",
  description: "Correct if something to be fix",
};

export default function EditPage({ params: { id } }: Props) {
  const router = useRouter();

  const getBook = async (): Promise<TNewbookSchema> => {
    const res = await fetch(`/api/book/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("failed to fetch");
    return await res.json();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TNewbookSchema>({
    defaultValues: getBook,
    resolver: zodResolver(newBookSchema),
  });

  const onSubmit = async (data: TNewbookSchema) => {
    const res = await fetch(`/api/book/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert("PUT Fetch Failed");
      return;
    }

    const resData = await res.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (resData.success) {
      console.log(resData.status.message);
      router.push(`/${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
      <div className="flex flex-col">
        <label className="text-blue-500 mb-1">Title</label>
        {errors.title && <p className="text-red-400">{errors.title.message}</p>}
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
        <textarea
          {...register("description")}
          className="h-full min-h-[100px] resize-none rounded-md border border-blue-500 px-4 py-2"
          name="description"
          placeholder="Book Description"
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label className="text-blue-500 mb-1">Author</label>
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
        <input
          {...register("published")}
          className="px-4 py-2 rounded border border-blue-500"
          name="published"
          type="number"
          placeholder="Book's Year Published"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-blue-500 mb-1">Link</label>
        <input
          {...register("url")}
          className="px-4 py-2 rounded border border-blue-500"
          name="link"
          type="text"
          placeholder="Book Link"
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
  );
}
