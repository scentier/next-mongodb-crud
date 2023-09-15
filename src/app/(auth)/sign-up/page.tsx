"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "@/lib/types";

export default function NewBook() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    // @ts-ignore
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-2 flex flex-col gap-y-2"
    >
      <input
        {...register("email")}
        type="email"
        name="email"
        placeholder="Email"
        className="px-4 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}
      <input
        {...register("password")}
        type="password"
        name="password"
        placeholder="Password"
        className="px-4 py-2 rouded"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}
      <input
        {...register("confirmPassword")}
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="px-4 py-2 rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 disabled:bg-gray-500 px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
