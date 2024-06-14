const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { uploadImage, getImage } = require("../controllers/image.controller");

//POST
//uploading image
//PATH:http://localhost:3000/api/upload
router.post("/", upload.single('file'), isAuth, uploadImage);

router.get('/:id', isAuth, getImage)

module.exports = router;
