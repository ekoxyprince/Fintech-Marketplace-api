const router = require("express").Router()
const auth = require("../middlewares/auth.middleware")
const {user} = require("../middlewares/role.middleware")
const _ = require("../controllers/user.controller")

router
.route("/details")
.get(_.getUserDetails)
.patch(_.updateDetails)
router
.route("/update_password")
.patch(_.updatePassword)
module.exports = router