import { HTTPError } from 'ky';

import { http } from '~/libs/ky';

const updateUserPassword = async (payload: {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}): Promise<any> => {
  try {
    const response = await http
      .put('auth/password', {
        json: payload,
      })
      .json();
    console.log({ response });
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<any>();
      console.log('errorBody', errorBody);
      throw new Error(
        Array.isArray(errorBody.message)
          ? errorBody.message.map((m: any) => m.message).join(', ')
          : errorBody.message || `HTTP error ${error.response.status}`
      );
    }
    throw error;
  }
};

export const AccountSettingsService = {
  updateUserPassword,
};
