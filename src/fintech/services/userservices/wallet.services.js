const axios = require("axios");
const { quidax_baseUrl, quidax_secret } = require("../../config/config");
const { AuthorizationError } = require("../../exceptions/errors");

const request = axios.create({ baseURL: quidax_baseUrl });
const options = {
  headers: {
    Authorization: `Bearer ${quidax_secret}`,
  },
};
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
      const resp = await axios.post(`${quidax_baseUrl}/users`, data, options);
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
  fetchUserWallets = async (userId) => {
    try {
      const resp = await axios.get(
        `${quidax_baseUrl}/api/v1/users/${userId}/wallets`,
        options
      );
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
  fetchUserWallet = async (userId, currency) => {
    try {
      const resp = await axios.get(
        `${quidax_baseUrl}/api/v1/users/${userId}/wallets/${currency}`,
        options
      );
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
  fetchUserPaymentAddress = async (userId, currency) => {
    try {
      const resp = await axios.get(
        `${quidax_baseUrl}/api/v1/users/${userId}/wallets/${currency}/address`,
        options
      );
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
  fetchUserPaymentAddresses = async (userId, currency) => {
    try {
      const resp = await axios.get(
        `${quidax_baseUrl}/api/v1/users/${userId}/wallets/${currency}/addresses`,
        options
      );
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
