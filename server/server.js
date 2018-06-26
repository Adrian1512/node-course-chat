const path  = require('path');
const http = require('http');
const publicPath = path.join(__dirname , '../public');
const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT ||  3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection' , (socket) => {
    console.log('New user Conected');

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hey, What is going on',
        createdAt: 23
    });
    socket.on('createMessage', (newEmail) => {
        console.log('createMessage', newEmail);
    })
    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    });
});
server.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

