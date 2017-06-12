'use strict';

require('dotenv').load();

console.log('process.env.NODE_ENV was', process.env.ENV);

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const SongController = require('./controllers/song');

const routes = require('./routes');

const port = process.env.PORT || 5000;

const checkAuth = require('./check_auth');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use("/", express.static(path.resolve(__dirname, '..', 'client', 'dist')));

// Initialize passport for use

app.use('/api', routes);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('authenticate', function (msg) {
        // sanitize this
        const token = msg.token;

        checkAuth.socketAuth(token, function (authenticated) {
            if (!authenticated.success) return socket.emit('authenticated', { success: false });

            socket.user = authenticated.user.dataValues;
            socket.emit('authenticated', { success: true });
        });
    });

    socket.on('logout', function (msg) {
        // sanitize this
        if (socket.user) {
            socket.user = null;
        }
    });

    socket.on('edit', function (msg) {
        console.log('the socket user was', socket.user);

        let userId = null;
        if (socket.user) {
            userId = socket.user.id;
        }

        SongController.editLyrics(msg.songId, userId, msg.newLyrics, function (edit) {
            if (edit.success) {
                socket.emit('update_lyrics', edit.lyrics);
                console.log('new lyrics, ', edit.lyrics);
            }
        });
    });

    socket.on('edit_title', function (msg) {
        let userId = null;
        if (socket.user) {
            userId = socket.user.id;
        }

        SongController.editTitle(msg.songId, userId, msg.newTitle, function (edit) {
            if (edit.success) {
                socket.emit('update_title', edit.title);
            }
        });
    });

    socket.on('edit_link', function (msg) {
        let userId = null;
        if (socket.user) {
            userId = socket.user.id;
        }

        SongController.editLink(msg.songId, userId, msg.newLink, function (edit) {
            if (edit.success) {
                socket.emit('update_link', edit.title);
            }
        });
    });
});

http.listen(port, function () {
    console.log('Listening on port ', port);
});

module.exports = app; // for testing