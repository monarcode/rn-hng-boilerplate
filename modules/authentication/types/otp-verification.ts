import { z } from 'zod';

import { otpVerificationFormSchema } from '../validation-schema/otp-verification-code';

export type OtpVerificationFormSchema = z.infer<typeof otpVerificationFormSchema>;
