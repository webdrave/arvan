import { z } from "zod";
export const product = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    discountPrize: z.number().positive("Discount Prize must be a positive number").optional(),
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