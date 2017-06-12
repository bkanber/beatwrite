'use strict';

const Sequelize = require('sequelize');

const db = require('../db');

const User = db.connection.define('Users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = User;