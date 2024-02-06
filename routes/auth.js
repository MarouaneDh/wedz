const router = require("express").Router();

const {
    validator,
    loginRules,
    registerRules,
} = require("../middlewares/authBodyValidator.js");

const { register, login } = require("../controllers/auth.controller");

//User registration
router.post("/register", registerRules(), validator, register)

//User login
router.post("/login", loginRules(), validator, login)

module.exports = router;