import { z } from "zod";

export const statsCanadaFetchCubeSchema = z.object({
  productId: z
    .string()
    .regex(/^\d+$/, "Product ID must only be numbers")
    .length(8, "Product ID must be 8 characters long"),
});

export const statsCanadaAddDataSchema = z.object({
  productId: z.number(),
  vector: z.array(z.string()).optional(),
});
