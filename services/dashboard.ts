import { HTTPError } from 'ky';

import { http } from '~/libs/ky';
import {
  DashboardResponse,
  DashboardResponseError,
  InviteLinkResponse,
  UserResponse,
} from '~/types/dashboard/dashboard';

const fetchDashboard = async (userId: string | undefined): Promise<DashboardResponse> => {
  try {
    const response = await http.get(`Dashboards?userId=${userId}`).json<DashboardResponse>();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<DashboardResponseError>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};
const fetchInvite = async (orgId: string | undefined): Promise<InviteLinkResponse> => {
  try {
    const response = await http.get(`organisations/${orgId}/invites`).json<InviteLinkResponse>();

    return response;
  } catch (error) {
    // console.log(error);

    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<DashboardResponseError>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};
const fetchUsers = async (orgId: string | undefined): Promise<UserResponse> => {
  try {
    const response = await http.get(`organisations/${orgId}/users`).json<UserResponse>();

    return response;
  } catch (error) {
    // console.log(error);

    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<DashboardResponseError>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};
export { fetchDashboard, fetchInvite, fetchUsers };
