const router = require("express").Router()
const auth = require("../middlewares/auth.middleware")
const {user} = require("../middlewares/role.middleware")
const controller = require("../controllers/user.controller")
const result = require("../middlewares/validation.middleware")
const _ = require("../validations/transaction.validation") 

router
.route("/details")
.get(controller.getUserDetails)
.patch(controller.updateDetails)
router
.route("/update_password")
.patch(controller.updatePassword)
router
.route("/update_pin")
.patch(controller.updatePin)
router
.route("/jjs_transfer")
.post([_.transAmount,_.transPin,_.jjsTag,result],controller.sendMoneyToJJSAccount)

module.exports = router