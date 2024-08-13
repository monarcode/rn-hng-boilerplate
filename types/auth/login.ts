export type AuthSuccessResponse = {
  message: string;
  data: AuthData;
  access_token: string;
  status_code: number;
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
