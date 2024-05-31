const router = require("express").Router()
const controller = require("../controllers/auth.controller")
const {user,email,password,phone} = require('../validations/auth.validation')
const result = require('../middlewares/validation.middleware')

router
.route("/signup")
.post([user,password,phone,result],controller.signup)
router
.route('/signin')
.post([email,password,result],controller.signin)


module.exports = router