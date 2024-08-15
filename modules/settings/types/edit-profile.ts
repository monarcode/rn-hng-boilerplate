import { z } from 'zod';

import { editProfileFormSchema } from '../validation-schema/edit-profile';

export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;
