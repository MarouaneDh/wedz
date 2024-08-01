const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { uploadImage, getImage } = require("../controllers/album.controller");

//POST
//uploading image
//PATH:http://localhost:3000/api/album
router.post("/", upload.single('file'), uploadImage);

router.get('/:id', getImage)

module.exports = router;