import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const zodBookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  author: z.string().min(3, "Author must be at least 3 characters"),
  published: z
    .number({ invalid_type_error: "invalid_type_error: Year must be numbers." })
    .min(687, "Year published must be at least 687")
    .positive(),
  url: z.string().min(3, "Link must be at least 3 characters"),
});

export type TZodBookSchema = z.infer<typeof zodBookSchema>;

type TBookStr = Record<"title" | "description" | "author" | "url", string>;

type TBookYearPub = {
  published: number;
};

type TOps = {
  slug?: string;
  tags?: string[];
};

export type TBookModel = TBookStr & TBookYearPub & TOps;

type TMongoObj = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type TBookObj = TMongoObj & TBookModel;
