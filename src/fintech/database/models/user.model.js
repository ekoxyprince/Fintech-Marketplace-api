const _ = require("mongoose");
const _hook = require("../hooks/user.hook");
const { server } = require("../../config/config");

const _schema = new _.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: Date,
  location: String,
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  quidaxId: {
    type: String,
    required: true,
  },
  quidaxSn: {
    type: String,
    required: true,
  },
  userRole: String,
  account: {
    nairaBalance: {
      type: Number,
      required: true,
      default: 0.0,
    },
    dollarBalance: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  cryptoAssets: [
    {
      name: String,
      slug: String,
      value: String,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  pin: String,
  image: {
    type: String,
    required: true,
    default: `${server}/static/default.png`,
  },
  beneficiaries: [
    {
      id: String,
      bankCode: String,
      bankName: String,
      bankAccountNo: String,
      receipientCode: String,
    },
  ],
});
_schema.pre("save", _hook.beforeSave);
module.exports = _.model("User", _schema);
