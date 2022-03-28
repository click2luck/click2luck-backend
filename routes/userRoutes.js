const { register }= require('../controllers/userController.js')
const { uploadFiles } = require('../controllers/filesController.js')
const {uploadSingle} = require('../controllers/filesController.js')
const router = require("express").Router();

router
.post('/register', register )
.post('/api', uploadSingle,uploadFiles)

module.exports = router;