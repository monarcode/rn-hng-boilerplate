export type Subscription = {
  data: SubscriptionData;
  message: string;
  status_code: number;
};

export type SubscriptionData = {
  id: string;
  userId: string;
  organisationId: string;
  transactionId: string;
  plan: string;
  frequency: string;
  isActive: boolean;
  amount: number;
  startDate: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionError = {
  data: string;
  error: string;
  message: string;
  status_code: number;
};
