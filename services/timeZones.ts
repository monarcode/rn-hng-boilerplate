import { HTTPError } from 'ky';

import { http } from '~/libs/ky';
import { NotSettingsResponse, NotSettingsResponseError } from '~/types/notification-settings';

const getTimeZone = async () => {
  try {
    const response = await http.get(`timezones`).json<any>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<NotSettingsResponseError>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const setTimeZone = async (payload: any) => {
  try {
    const response = await http
      .post(`settings/notification-settings`, {
        json: { ...payload },
      })
      .json<any>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<NotSettingsResponseError>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

export const TimeZoneService = {
  setTimeZone,
  getTimeZone,
};
