import { z } from 'zod';

import { organisationSignupFormSchema } from '../validation-schema/organisation-sign-up';

export type OrganisationSignupFormSchema = z.infer<typeof organisationSignupFormSchema>;
