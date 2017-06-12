'use strict';

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// bring in the passport strategy we definied


const User = require('../models/user');
const Song = require('../models/song');

const registrationValidation = require('./helpers/registrationValidation');

function generateToken(user) {
    console.log('the secret key is', process.env.SECRET_AUTH_KEY);
    return jwt.sign(user, process.env.SECRET_AUTH_KEY, {
        expiresIn: 10080 // in seconds
    });
}

function setUserInfo(user) {
    const getUserInfo = {
        id: user.id,
        username: user.username
    };
    return getUserInfo;
}

module.exports.tokenAuth = function (req, res) {
    if (req.user !== null && req.user !== '' && req.user !== undefined) {
        Song.findAll({ where: {
                UserId: req.user.id
            } }).then(songs => {
            return res.json({
                success: true,
                username: req.user.username,
                songs: songs
            });
        });
    } else {
        return res.status(500).send({ success: false, error: 'Account not found' });
    }
};

module.exports.authenticate = function (req, res) {
    console.log('the username', req.body.username);
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            res.status(500).send('User not found.');
        } else {
            bcrypt.compare(req.body.password, user.dataValues.password, (err, isMatch) => {
                if (err) res.status(500).send({ success: false, error: 'Error' });
                if (isMatch) {
                    const userInfo = setUserInfo(user.dataValues);

                    // after we succesfully authenticate the user, we need to get all
                    // the songs created by the user as well.

                    Song.findAll({ where: {
                            UserId: userInfo.id
                        } }).then(songs => {
                        console.log('the songs were', songs);

                        res.json({
                            success: true,
                            token: generateToken(userInfo),
                            user: userInfo,
                            songs: songs
                        });
                    });
                } else {
                    return res.status(500).send({ success: false, error: 'Password invalid' });
                }
            });
        }
    });
};

module.exports.register = function (req, res) {

    let params = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2
    };

    const validated = registrationValidation(params);
    console.log('validated was', validated);
    if (!validated.success) {
        return res.status(500).send(validated);
    }

    const username = req.body.username;
    const email = req.body.email;

    bcrypt.hash(req.body.password, 12, function (error, hash) {
        if (error) {
            res.status(500).send({ success: false, error: 'Internal server error' });
        }
        try {

            User.create({
                username,
                password: hash,
                email
            }).then(user => {

                console.log('the user we made was', user);

                const userInfo = setUserInfo(user.dataValues);

                return res.json({
                    success: true,
                    token: generateToken(userInfo),
                    user: userInfo
                });
            });
        } catch (error2) {
            return res.status(500).send({ success: false, error: error2.message });
        }
    });
    return undefined;
};