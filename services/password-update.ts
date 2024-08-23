import { HTTPError } from 'ky';

import { http } from '~/libs/ky';

const updateUserPassword = async (payload: any): Promise<any> => {
  try {
    const response = await http
      .put('auth/password', {
        json: { ...payload },
      })
      .json();
    console.log({ response });
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<any>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

export const AccountSettingsService = {
  updateUserPassword,
};
