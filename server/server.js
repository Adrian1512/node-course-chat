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

let {generateMessage} =  require('./utils/message');

io.on('connection' , (socket) => {
    console.log('New user Conected');


    socket.emit('newMessage', generateMessage('Admin', 'Werlcome to chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin', 'A new user has join'))
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // io.emit('newMessage', {


        // })
        socket.broadcast.emit('newMessage',generateMessage(message.from, message.text))
    })
    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    });
});
server.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

