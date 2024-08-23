import { z } from 'zod';

import { changePasswordSchema } from '../validation-schema/change-password';

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
