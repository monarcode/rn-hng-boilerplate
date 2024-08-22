import { HTTPError } from 'ky';

import { http } from '~/libs/ky';
import { NotSettingsResponse, NotSettingsResponseError } from '~/types/notification-settings';

const getNotifications = async (userId: string | undefined) => {
  try {
    const response = await http.get(`settings/notification-settings/${userId}`).json<any>();

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

const setNotifications = async (notificationData: any) => {
  let payload: any = {};
  notificationData.map((section: any) => {
    section.data.map((data: any) => {
      payload[data.id] = data.status;
    });
  });

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

export const NotificationSettingsService = {
  setNotifications,
  getNotifications,
};
