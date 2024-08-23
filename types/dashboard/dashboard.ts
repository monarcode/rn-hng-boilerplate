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
  revenue: 0;
  subscriptions: 0;
  sales: 0;
  activeSubscription: 0;
  monthSales: Array<monthSale>;
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
