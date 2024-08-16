export type ProfileData = {
  first_name: string;
  last_name: string;
  phone_number: string;
  user_name: string;
  pronoun: string;
  job_title: string;
  bio: string;
  department: string;
  facebook_link: string;
  twitter_link: string;
  linkedin_link: string;
  avatar_url?: string;
};

export type ProfileState = {
  data: ProfileData | null;
};

export type ProfileActions = {
  setData: (data: ProfileData) => void;
  updateProfile: (data: Partial<ProfileData>) => void;
  uploadPicture: (avatarUrl: string) => void;
  deletePicture: () => void;
  resetStore: () => void;
};

export type ProfileStore = ProfileState & ProfileActions;

export type ProfileUpdateResponse = {
  message: string;
  data: ProfileData;
  status_code: number;
};

export type ProfilePictureResponse = {
  message: string;
  data: {
    avatar_url: string;
  };
  status_code: number;
};

export type ProfileDeletePictureResponse = {
  message: string;
  status_code: number;
};
