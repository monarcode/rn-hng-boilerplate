import { z } from 'zod';

import { resetPasswordFormSchema } from '../validation-schema/reset-password';

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
