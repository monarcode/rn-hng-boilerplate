import { AuthData } from './login';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type AuthUserData = AuthData;

export type AuthToken = string;

export type AuthState = {
  data: AuthUserData | null;
  token: AuthToken | null;
  status: AuthStatus;
};

export type AuthActions = {
  setData: (data: AuthUserData) => void;
  setToken: (token: AuthToken) => void;
  setStatus: (status: AuthStatus) => void;
  resetStore: () => void;
};

export type AuthStore = AuthState & AuthActions;
