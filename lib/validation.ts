import { z } from 'zod';

export const UserFormValidation = z.object({
  name: z.string()
    .min(2, "Name must be at least 6 characters.")
    .max(30, "Name must be at most 30 characters."),
  email: z.string()
    .email('Invalid email address'),
  phone: z.string()
    .refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), 'Invalid phone number'),
  })
