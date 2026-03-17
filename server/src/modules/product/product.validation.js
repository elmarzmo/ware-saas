import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    sku: z.string().min(2, "SKU must be at least 2 characters long"),
   
    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer").min(1, "Quantity must be a positive integer"),
}
);