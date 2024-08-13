import ky from 'ky';

import useAuthStore from '~/store/auth';

const baseclient = ky.extend({
  prefixUrl: process.env.EXPO_PUBLIC_API_BASEURL,
  timeout: 60000,
  retry: 3,
});

const http = baseclient.extend({
  hooks: {
    beforeRequest: [
      async (request, options) => {
        const token = useAuthStore.getState().token;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
        return request;
      },
    ],
  },
});

export default baseclient;
export { http };
