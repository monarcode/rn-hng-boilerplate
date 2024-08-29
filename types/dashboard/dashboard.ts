import { Member } from '../member';

type monthSale = {
  id: string;
  user_id: string;
  product_id: string;
  subscription_id: string;
  type: string;
  status: string;
  partners: string;
  amount: number;
  reference: string;
  created_at: string;
  paid_at: string;
  modified_at: string;
};

type DashboardResponse = {
  revenue: number;
  subscriptions: number;
  sales: number;
  activeSubscription: number;
  monthSales: monthSale[];
};

type DashboardResponseError = {
  data: string;
  error: string;
  message: string;
  status_code: number;
};
type InviteLinkResponse = {
  status_code: number;
  message: string;
  data: {
    invite_link: string;
  };
};
type UserResponse = {
  data: {
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
    updated_at: string;
    owner_id: string;
    is_active: boolean;
    users: [Member];
  };
  message: string;
  status_code: number;
};
export { DashboardResponse, DashboardResponseError, InviteLinkResponse, UserResponse };
