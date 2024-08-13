import ky from 'ky';

import useAuthStore from '~/store/auth';

const baseclient = ky.extend({
  // TODO: Add base url here
  prefixUrl: process.env.EXPO_PUBLIC_API_BASEURL,
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
