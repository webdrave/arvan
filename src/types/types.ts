import { z } from "zod";
export const product = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    discountPrice: z.number().positive("Discount Prize must be a positive number").optional(),
    category_id: z.string().cuid("Invalid category ID"),
    material: z.string().min(1, "Material is required"),
    assets: z
      .array(
        z.object({
          url: z.string().url("Invalid asset URL"),
          type: z.enum(["IMAGE", "VIDEO"]),
        })
      )
      .optional(),
    status: z.enum(['DRAFT', 'PUBLISHED']),
  });

export type Product = z.infer<typeof product>;

export const category = z.object({
  id: z.string().uuid("Invalid category ID"),
  name: z.string().min(1, "Category name is required"),
  productCount: z.number().positive("Product count must be a positive number").optional(),
  description: z.string().min(1, "Category description is required").optional(),
});

export type Category = z.infer<typeof category>;


export const LoginSchema = z.object({

  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .regex(
      /^(\+?\d{1,3})?\d{10}$/,
      "Invalid mobile number format"
    ),
  password: z.string().min(1, "Password is required"),
});



export const SignUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    mobileNumber: z
      .string()
      .min(1, "Mobile number is required")
      .regex(/^(\+?\d{1,3})?\d{10}$/, "Invalid mobile number format"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })