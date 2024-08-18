import * as FileSystem from 'expo-file-system';
import { HTTPError } from 'ky';

import { http } from '~/libs/ky';
import {
  ProfileData,
  ProfileDeletePictureResponse,
  ProfilePictureResponse,
  ProfileUpdateResponse,
} from '~/types/profile/profile';

const updateProfile = async (email: string, payload: any): Promise<ProfileUpdateResponse> => {
  try {
    const response = await http
      .put(`profile/${email}`, {
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

const uploadPicture = async (email: string, photo: string): Promise<ProfilePictureResponse> => {
  try {
    // Read the file as base64
    const base64 = await FileSystem.readAsStringAsync(photo, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Create a Blob from the base64 string
    const blob = await new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', `data:image/jpeg;base64,${base64}`, true);
      xhr.send(null);
    });

    // Extract the file name from the photo path
    const fileName = photo.split('/').pop() || 'image.jpg';

    // Create FormData
    const formData = new FormData();
    formData.append('picture', blob, fileName);
    formData.append('email', email);
    console.log('formData:', formData);

    const response = await http
      .put(`profile/${email}/picture`, {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

const deletePicture = async (email: string): Promise<ProfileDeletePictureResponse> => {
  try {
    const response = await http
      .delete(`profile/${email}/picture`)
      .json<ProfileDeletePictureResponse>();

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
