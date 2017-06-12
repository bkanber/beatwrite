'use strict';

const Sequelize = require('sequelize');

const db = require('../db');

const User = require('./user');

const Song = db.connection.define('Songs', {
    link: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
    },
    lyrics: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,
        unique: false,
        defaultValue: true
    },
    title: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    hasOwner: {
        type: Sequelize.BOOLEAN,
        unique: false,
        defaultValue: false
    }
});

Song.belongsTo(User);

module.exports = Song;