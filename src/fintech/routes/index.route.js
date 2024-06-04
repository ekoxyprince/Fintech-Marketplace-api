const router = require("express").Router()
const controller = require("../controllers/index.controller")
const _ = require("../validations/transaction.validation")
const result = require("../middlewares/validation.middleware")

router
.route("/tag/:account_number")
.get([_.jjsTag,result],controller.findUserByTag)
router
.route("/transaction/:id")
.get([_.transId,result],controller.findTransaction)


module.exports = router