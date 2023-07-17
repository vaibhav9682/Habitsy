const express = require('express');
const router = express.Router()
const UserController = require('../controller/user_controller')
const passport = require('passport')
const HabitController = require('../controller/habitController')

router.get('/signup', UserController.signup);
router.get('/signin', UserController.signin);
router.get('/dashboard', passport.checkAuthentication, UserController.dashboard);


router.post('/create', UserController.create);
router.post('/create-session',
    passport.authenticate(
        'local',
        { failureRedirect: '/users/signin' },
    )
    , UserController.createSession);

router.get('/profile', passport.checkAuthentication, UserController.profile);

router.get('/logout', UserController.destroySession);
router.get('/track/:id', passport.checkAuthentication, HabitController.showTrack);










module.exports = router;