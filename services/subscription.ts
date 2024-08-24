import { HTTPError } from 'ky';

import { http } from '~/libs/ky';
import { Subscription, SubscriptionError } from '~/types/subscriptions/subscriptions';

const fetchSubscription = async (userId: string | undefined): Promise<Subscription> => {
  try {
    const response = await http.get(`subscriptions/user/?userId=${userId}`).json<Subscription>();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<SubscriptionError>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

export { fetchSubscription };
