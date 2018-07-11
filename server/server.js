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
    socket.on('createMessage', (mensaje, callback) => {

        console.log('createMessage', mensaje);
        
        io.emit('newMessage', generateMessage(mensaje.from, mensaje.text));
        if (callback) callback('this is from the server');
        
    });
    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    });
});
server.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

