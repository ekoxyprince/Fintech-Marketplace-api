const catchAsync = require("../utilities/trycatch");

exports.getUserDetails = catchAsync(async (req, res) => {
  const data = req.user.instance;
  res.json({
    success: true,
    code: 200,
    message: "Fetched details!",
    data,
  });
});
exports.updatePassword = catchAsync(async (req, res) => {
  const data = await req.user.updatePassword(req.body);
  res.json({
    success: true,
    code: 200,
    message: "Password updated!",
  });
});
exports.updatePin = catchAsync(async (req, res) => {
  const data = await req.user.updatePin(req.body);
  res.json({
    success: true,
    code: 200,
    message: "Pin updated",
  });
});
exports.updateDetails = catchAsync(async (req, res) => {
  const data = await req.user.updateDetails(req.body);
  res.json({
    success: true,
    code: 200,
    message: "Details Updated",
  });
});
exports.sendMoneyToJJSAccount = catchAsync(async (req, res) => {
  const data = await req.user.initiateJJSTransfer(req.body);
  res.json({
    success: true,
    code: 201,
    message: "Transfer successful",
    data: data,
  });
});
exports.getJJSTransactions = catchAsync(async (req, res) => {
  const data = await req.user.getJJSTransactions();
  res.json({
    success: true,
    code: 200,
    message: "Transactions found!",
    data: data,
  });
});
exports.sendMoneyToBankAccount = catchAsync(async (req, res) => {
  const data = await req.user.initiateBankTransfer(req.body);
  res.json({
    success: true,
    code: 200,
    message: "Transaction successful!",
    data: data,
  });
});
