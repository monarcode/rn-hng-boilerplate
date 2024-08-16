import { HTTPError } from 'ky';

import { http } from '~/libs/ky';
import {
  ProfileData,
  ProfileDeletePictureResponse,
  ProfilePictureResponse,
  ProfileUpdateResponse,
} from '~/types/profile/profile';

const updateProfile = async (
  email: string,
  newData: Partial<ProfileData>
): Promise<ProfileUpdateResponse> => {
  try {
    const response = await http
      .put(`profile/${email}`, {
        json: newData,
      })
      .json<ProfileUpdateResponse>();

    console.log(response);

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<ProfileUpdateResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);

      console.log(errorBody.message);
    }
    throw error;
  }
};

const uploadPicture = async (email: string, photo: any): Promise<ProfilePictureResponse> => {
  try {
    const formData = new FormData();
    formData.append('picture', photo);
    const response = await http
      .put(`profile/${email}/picture`, {
        body: formData,
      })
      .json<ProfilePictureResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<ProfilePictureResponse>();
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
