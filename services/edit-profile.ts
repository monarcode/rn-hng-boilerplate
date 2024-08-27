import * as FileSystem from 'expo-file-system';
import { HTTPError } from 'ky';
import { Platform } from 'react-native';

import { http } from '~/libs/ky';
import {
  ProfileDeletePictureResponse,
  ProfilePictureResponse,
  ProfileUpdateResponse,
} from '~/types/profile/profile';

const updateProfile = async (payload: any): Promise<ProfileUpdateResponse> => {
  try {
    const response = await http
      .put(`profile`, {
        json: { ...payload },
      })
      .json<ProfileUpdateResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<ProfileUpdateResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const uploadPicture = async (photo: string): Promise<ProfilePictureResponse> => {
  try {
    const formData = new FormData();

    const filename = Platform.OS === 'ios' ? 'photo.jpg' : 'photo';

    formData.append('display_photo', {
      uri: photo,
      name: filename,
      type: 'image/jpeg',
    } as any);

    console.log('formData:', formData);

    const response = await http
      .put(`profile/picture`, {
        body: formData,
        // Remove the Content-Type header
      })
      .json<ProfilePictureResponse>();

    console.log(response);
    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<ProfilePictureResponse>();
      console.error('picture: ', errorBody);
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const deletePicture = async (): Promise<ProfileDeletePictureResponse> => {
  try {
    const response = await http.delete(`profile/picture`).json<ProfileDeletePictureResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<ProfileDeletePictureResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

export const ProfileService = {
  updateProfile,
  uploadPicture,
  deletePicture,
};
