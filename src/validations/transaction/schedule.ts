import { z } from 'zod';
import { createValidation } from './create';

export const scheduleValidation = () =>
    createValidation().extend({
        transactionName: z.string({ message: "Schedule Name must not be empty." }),
        frequency: z.enum(['Once', 'Weekly', 'Monthly']),
        startDate: z.date({
            required_error: "Please select a start Date",
            invalid_type_error: "That's not a date"
        }),
        endDate: z.date({
            required_error: "Please select a end Date",
            invalid_type_error: "That's not a date"
        }),
        dayOfWeek: z.number().optional(),
        dayOfMonth: z.number().optional()
    });

export type ScheduleTransactionType = z.infer<ReturnType<typeof scheduleValidation>>;