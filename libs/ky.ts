import ky from 'ky';

const baseclient = ky.extend({
  // TODO: Add base url here
  prefixUrl: '',
});

const http = baseclient.extend({
  hooks: {
    beforeRequest: [
      async (request, options) => {
        // TODO: Add authorization logic here
        return request;
      },
    ],
  },
});

export default http;
