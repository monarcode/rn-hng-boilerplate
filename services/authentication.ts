import { HTTPError } from 'ky';

import { http } from '~/libs/ky';
import { OtpVerificationFormSchema } from '~/modules/authentication/types/otp-verification';
import { ResetPasswordFormSchema } from '~/modules/authentication/types/reset-password';
import {
  AuthLoginResponse,
  AuthSuccessResponse,
  ErrorResponse,
  ForgotPasswordResponse,
  OrganisationResponse,
  UserDetailsResponse,
} from '~/types/auth/login';

const getUserDetails = async (): Promise<UserDetailsResponse> => {
  try {
    const response = await http.get('auth/@me').json<UserDetailsResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<ErrorResponse>();

      if (error.response.status === 401) {
        throw new Error(errorBody.detail || 'Unauthorized');
      }

      throw new Error(errorBody.detail || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const loginUser = async ({
  email,
  password,
}: Record<string, string>): Promise<AuthSuccessResponse> => {
  try {
    const response = await http
      .post('auth/login', {
        json: { email, password },
      })
      .json<AuthSuccessResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<AuthLoginResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    const response = await http
      .post('auth/forgot-password-mobile', {
        json: { email },
      })
      .json<ForgotPasswordResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<AuthLoginResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }

    throw error;
  }
};

const verifyOtpCode = async ({ email, code }: any): Promise<ForgotPasswordResponse> => {
  try {
    const response = await http
      .post(`auth/verify-code`, {
        json: { email, code },
      })
      .json<ForgotPasswordResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<ErrorResponse>();
      throw new Error(errorBody.detail || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const changeUserPassword = async (
  payload: ResetPasswordFormSchema
): Promise<AuthSuccessResponse> => {
  try {
    const response = await http
      .post('auth/reset-password', {
        json: { ...payload },
      })
      .json<AuthSuccessResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<AuthLoginResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const createUser = async (payload: any): Promise<AuthSuccessResponse> => {
  try {
    const response = await http
      .post('auth/register', {
        json: { ...payload },
      })
      .json<AuthSuccessResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<AuthLoginResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const createUserOrganisation = async (payload: any): Promise<OrganisationResponse> => {
  try {
    const response = await http
      .post('organisations', {
        json: { ...payload },
      })
      .json<OrganisationResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<ErrorResponse>();
      throw new Error(errorBody.detail || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

export const AuthService = {
  loginUser,
  createUser,
  forgotPassword,
  verifyOtpCode,
  changeUserPassword,
  createUserOrganisation,
  getUserDetails,
};
