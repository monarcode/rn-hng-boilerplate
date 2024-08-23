export type AuthSuccessResponse = {
  message: string;
  data: AuthData;
  access_token: string;
  status_code: number;
};

export type OrganisationResponse = {
  id: number;
  name: string;
  description: string;
  slug: string;
  email: string;
  industry: string;
  type: string;
  country: string;
  address: string;
  state: string;
  created_at: string;
  update_at: string;
  owner_id: string;
  is_active: boolean;
};

export type AuthData = {
  user: User;
  organisations: Organisation[];
};

export type Organisation = {
  organisation_id: string;
  name: string;
  role: any;
  is_owner: boolean;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  email: string;
  created_at: string;
  is_superadmin: boolean;
};

export type AuthLoginResponse = {
  message: string;
  error: string;
  status_code: number;
};

export type UserDetailsResponse = {
  data: {
    fullname: string;
    id: string;
    email: string;
    profile: {
      first_name: string;
      last_name: string;
      phone_number: string;
      avatar_url: string;
      user_id: string;
      user_name: string;
      pronoun: string;
      job_title: string;
      bio: string;
      department: string;
      facebook_link: string;
      twitter_link: string;
      linkedin_link: string;
    };
    avatar_url: string;
  };
  message: string;
  status_code: number;
};

export type ErrorResponse = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  [key: string]: string | number; // For additional properties
};
