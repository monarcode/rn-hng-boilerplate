import ky from 'ky';

import useAuthStore from '~/store/auth';

const baseclient = ky.extend({
  prefixUrl: 'https://api-csharp.boilerplate.hng.tech/api/v1/',
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
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          useAuthStore.setState({
            status: 'unauthenticated',
            token: null,
            data: null,
          });
        }

        return response;
      },
    ],
  },
});

export default baseclient;
export { http };
