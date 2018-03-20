var express = require('express');
var router = express.Router();
const UserController = require('./../Controller/UserController');
router.get('/profile',UserController.getUser);
module.exports = router;
