const _ = require("lodash");
const User = require("../../database/models/user.model");
const {
  AuthenticationError,
  AuthorizationError,
} = require("../../exceptions/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../config/config");
const walletService = require("./wallet.services");

module.exports = class AuthService {
  static async createUser(body) {
    try {
      let data = _.pick(body, ["email", "fullname", "phone", "password"]);
      data["role"] = "user";
      const resp = await walletService.createSubAccount({
        first_name: data.fullname.split(" ")[0],
        last_name: data.fullname.split(" ")[1],
        email: data.email,
      });
      console.log(resp);
      const user = await User.create(data);
    } catch (error) {
      console.log(error);
      if (error instanceof AuthorizationError) {
        throw new AuthorizationError(error);
      }
      throw new Error(error);
    }
  }
  static signinUser(body) {
    let data = _.pick(body, ["email", "password"]);
    return User.findOne({ email: data["email"] })
      .then(async (user) => {
        if (!user || !(await bcrypt.compare(data["password"], user.password))) {
          throw new AuthenticationError("Incorrect creditials");
        }
        const token = jwt.sign({ id: user._id }, jwt_secret);
        return { accessToken: token };
      })
      .catch((error) => {
        if (error instanceof AuthenticationError) {
          throw new AuthenticationError(error);
        } else {
          throw new Error(error);
        }
      });
  }
};
