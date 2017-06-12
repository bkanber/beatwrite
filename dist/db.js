'use strict';

/**
 * Created by gotti on 4/21/17.
 */
const config = require('config');
const Sequelize = require('sequelize');

let connection;
if (process.env.CLEARDB_DATABASE_URL) {
    connection = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
    connection = new Sequelize('beatwrite', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD);
}

connection.sync();

exports.connection = connection;