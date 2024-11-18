import { z } from 'zod';
import { createValidation } from './create';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const scheduleValidation = (selectedFrequency: string) =>
    createValidation().extend({
        transactionName: z.string({ message: "Schedule Name must not be empty." }),
        frequency: z.string({ message: "Frequency must not be empty." }),
        startDate: z.date({
            required_error: "Please select a start Date",
            invalid_type_error: "That's not a date",
        }).refine((date) => date >= today, { message: "Start Date must be today or later." }),
        endDate: selectedFrequency === 'Once'
            ? z.date().optional()
            : z.date({
                required_error: "Please select an end Date",
                invalid_type_error: "That's not a date",
            }).refine((date) => date > today, { message: "End Date must be later than today." }),
        dayOfWeek: selectedFrequency === 'Once'
            ? z.coerce.number().optional()
            : z.coerce.number({ invalid_type_error: "Day of Week must be a number" }),
        dayOfMonth: selectedFrequency === 'Once'
            ? z.coerce.number().optional()
            : z.coerce.number({ invalid_type_error: "Day of Month must be a number" }),
    }).refine(
        (data) => !data.endDate || data.endDate > data.startDate || selectedFrequency === 'Once', // Only validate endDate if it exists
        { message: "End Date must be greater than Start Date", path: ["endDate"] }
    );

export type ScheduleTransactionType = z.infer<ReturnType<typeof scheduleValidation>>;
