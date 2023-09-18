"use client";
// import httpService from "@/services/http-service";
import { useForm } from "react-hook-form";

type Props = {
  params: { id: string };
};

export default function EditPage({ params: { id } }: Props) {
  const getBook = async () => {
    const res = await fetch(`/api/book/${id}`, { cache: "no-store" });
    return await res.json();
  };

  const { register } = useForm({ defaultValues: getBook });
  return (
    <form className="space-y-3 mt-2">
      <div className="flex flex-col">
        <label className="text-indigo-500 mb-1">Title</label>
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

        <textarea
          className="h-full min-h-[100px] resize-none rounded-md border border-indigo-500 px-4 py-2"
          name="description"
          placeholder="Book Description"
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label className="text-indigo-500 mb-1">Author</label>

        <input
          className="px-4 py-2 rounded border border-indigo-500"
          name="author"
          type="text"
          placeholder="Book Author"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-indigo-500 mb-1">Published</label>

        <input
          className="px-4 py-2 rounded border border-indigo-500"
          name="published"
          type="number"
          placeholder="Book's Year Published"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-indigo-500 mb-1">Link</label>
        <input
          className="px-4 py-2 rounded border border-indigo-500"
          name="link"
          type="text"
          placeholder="Book Link"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 disabled:bg-gray-500 text-gray-100 px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
