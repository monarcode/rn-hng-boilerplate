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
export { DashboardResponse, DashboardResponseError, InviteLinkResponse };
