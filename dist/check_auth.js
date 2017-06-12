'use strict';

/*
 This will check to see if there was a token in the header, and
 if there was it will attempt to authenticate the token and then add a user attribute
  to the request.
 */

const jwt = require('jwt-simple');
const User = require('./models/user');
const config = require('config');

module.exports.httpAuth = function (req, res, next) {
    const opts = {};
    console.log('the req.body was', req.body);
    const token = req.headers.authorization;

    console.log('the token was', token);
    if (token) {
        try {
            var decoded = jwt.decode(token, config.secretAuthKey);
        } catch (e) {
            console.log('the error was', e);
            next(null, null);
            return;
        }

        User.findOne({
            where: { id: decoded.id }
        }).then(user => {
            if (user) {
                req.user = user;
                next(null, user);
            } else {
                next(null, null);
            }
        }).catch(err => {
            next(null, null);
        });
    } else {
        next(null, null);
    }
};

module.exports.socketAuth = function (token, callback) {

    if (token) {
        try {
            var decoded = jwt.decode(token, config.secretAuthKey);
        } catch (e) {
            return callback({ success: false });
        }

        User.findOne({
            where: { id: decoded.id }
        }).then(user => {
            if (user) {
                return callback({ success: true, user: user });
            } else {
                return callback({ success: false });
            }
        }).catch(err => {
            return callback({ success: false });
        });
    } else {
        return callback({ success: false });
    }
};