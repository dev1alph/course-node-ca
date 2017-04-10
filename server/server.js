const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // html template path

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (message) => { // receiving
        console.log('createMessage ', message);
        io.emit('newMessage', { // io.emit send message to all the connections i.e. room main chat
           from: message.from,
           text: message.text,
           createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
