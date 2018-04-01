const express = require('express');
const router = express.Router();
const TodoController = require('./../Controller/TodoController');
router.post('/todo',TodoController.create);
router.get('/todo',TodoController.get);
module.exports = router;
