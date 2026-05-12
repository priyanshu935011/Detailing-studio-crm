import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(6),
    password: z.string().min(8),
    role: z.enum(['admin', 'staff']).default('staff')
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});
