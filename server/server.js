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

const {Users} = require('./utils/users')
let users = new Users();
let {generateMessage, generateLocationMessage} =  require('./utils/message');
let {isRealString} = require('./utils/validation');
io.on('connection' , (socket) => {
    console.log('New user Conected');


 
    
    socket.on('join', (params, callback) => {
            if(!isRealString(params.name) || !isRealString(params.room)){
                if (callback) 
                return callback('Name and room name are required');
            }


            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

            socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`))
   
            if (callback) callback();
    })
    
    socket.on('createMessage', (mensaje, callback) => {

        let user = users.getUser(socket.id);
        if(user && isRealString(mensaje.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, mensaje.text));
            
        }
        if (callback) callback();
        
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        if(user ){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, 
            coords.latitude, coords.longitude));
        }
        
    });

    socket.on('disconnect', () => {

        let user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left`));
        }
        console.log('User disconnected from server');
    });
});
server.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

