'use strict';

const express = require('express');

// bring in the passport strategy we definied
const router = express.Router();

const SongController = require('./controllers/song');
const UserController = require('./controllers/user');

const checkAuth = require('./check_auth');

router.route('/song/create').post(checkAuth.httpAuth, SongController.createAPI);

router.route('/song/upload').get(checkAuth.httpAuth, SongController.uploadAPI);

router.route('/song/:id').get(checkAuth.httpAuth, SongController.getAPI);

router.route('/user/register').post(UserController.register);

router.route('/user/login').post(UserController.authenticate);

router.route('/user/authenticateToken').post(checkAuth.httpAuth, UserController.tokenAuth);

module.exports = router;