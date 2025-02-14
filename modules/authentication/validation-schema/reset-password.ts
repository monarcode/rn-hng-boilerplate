import { z } from 'zod';

export const resetPasswordFormSchema = z
  .object({
    new_password: z.string({
      required_error: 'New password is required',
    }),
    confirm_new_password: z.string({
      required_error: 'Please confirm your new password',
    }),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords don't match",
    path: ['confirm_new_password'],
  });
