const axios = require("axios");
const { quidax_baseUrl, quidax_secret } = require("../../config/config");
const { AuthorizationError } = require("../../exceptions/errors");

const request = axios.create({ baseURL: quidax_baseUrl });
request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${quidax_secret}`;
  },
  (error) => {
    return Promise.reject(error);
  }
);
class WalletService {
  constructor() {
    this.req = request;
  }
  createSubAccount = async (data) => {
    try {
      const resp = await axios.post(`${quidax_baseUrl}/users`, data, {
        headers: {
          Authorization: `Bearer ${quidax_secret}`,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.status == 403) {
        console.log(error);
        throw new AuthorizationError("Unauthorized request found!");
      } else {
        throw new Error(error);
      }
    }
  };
}

module.exports = new WalletService();
