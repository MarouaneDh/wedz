const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth')
const { createList, getAllLists, getOneList, updateList, deleteList } = require('../controllers/list.controller')

//POST
//list posting
//PATH: http://localhost:6000/api/list/
//params Body
router.post("/", isAuth, createList);

//GET
//getting all lists
//PATH: http://localhost:6000/api/list/
router.get("/", isAuth, getAllLists);

//POST
//getting list by id
//PATH:http://localhost:6000/api/list/:id
//params id
router.post("/:id", isAuth, getOneList);

//PATCH
//updating a list by id
//PATH:http://localhost:6000/api/list/:id
//params id body
router.patch("/:id", isAuth, updateList);

//DELETE
//deleting a list by id
//PATH: http://localhost:6000/api/list/:id
//params id
router.delete("/:id", isAuth, deleteList);

module.exports = router;
