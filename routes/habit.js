const express = require('express');
const router = express.Router()
const passport = require('passport')
const habitController = require('../controller/habitController')

router.get('/form', habitController.form);
router.post('/create', habitController.create);

router.post('/create', habitController.create);
router.get('/day', habitController.day);
router.get('/delete/:id', habitController.delete)














module.exports = router;