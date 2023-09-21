"use client";
import { useRouter } from "next/navigation";
import { BsTrash } from "react-icons/bs";

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`/api/book?deleteId=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button className="text-red-400" type="submit" onClick={handleDelete}>
      <BsTrash size={20} />
    </button>
  );
}
