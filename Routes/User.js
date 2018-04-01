var express = require('express');
var router = express.Router();
const UserController = require('./../Controller/UserController');
router.get('/profile',UserController.getUser);
router.get('/id',UserController.getId);
// router.post('/todo',UserController.todo);
module.exports = router;
