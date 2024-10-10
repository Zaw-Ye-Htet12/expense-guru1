import { z } from 'zod'

export const createValidation=(isDesktop:boolean) => z.object({
    categoryId: z.string({ message: "Category must not be empty." }),
    amount: z.string({ message: "Amount must not be empty." })
        .refine((val) => /^[1-9][0-9,]*$/.test(val.replace(/,/g, "")), {
            message: "Amount must not start with 0 and must be a valid number.",
        })
        .refine(
            (val) => Number(val.replace(/,/g, "")) >= 1,
            "Amount must be at leat 1."
        ),
    type: isDesktop 
    ? z.string({ message: "Type must not be empty." }) 
    : z.string().optional(),  
});

export type TransactionType = z.infer<ReturnType<typeof createValidation>>;