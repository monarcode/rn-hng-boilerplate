import { HTTPError } from 'ky';

import { http } from '~/libs/ky';
import { AuthLoginResponse, AuthSuccessResponse } from '~/types/auth/login';

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

const changeUserPassword = async (payload: any): Promise<AuthSuccessResponse> => {
  try {
    const response = await http
      .post('auth/update/password', {
        json: { email: payload.email, new_password: payload.new_password },
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

export const AuthService = {
  loginUser,
  createUser,
  changeUserPassword,
};
