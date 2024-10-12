import { z } from 'zod'
import { isMobile } from 'react-device-detect';

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
    type: !isMobile
        ? z.string({ message: "Type must not be empty." })
        : z.string().optional(),
    note: z.string().min(5, { message: "Note must be at least 5 characters long" })
        .max(200, { message: "Note can't exceed 200 characters" })
        .optional().or(z.literal(""))
});

export type TransactionType = z.infer<ReturnType<typeof createValidation>>;