const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth')
const { getUser, editUser } = require('../controllers/user.controller')

//GET
//getting user by id
//PATH:http://localhost:6000/api/user/:id
//params id
router.get("/:id", isAuth, getUser);

//PATCH
//updating a user by id
//PATH:http://localhost:6000/api/user/:id
//params id body
router.patch("/:id", isAuth, editUser);

module.exports = router;
