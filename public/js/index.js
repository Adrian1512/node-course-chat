let socket = io();
socket.on('connect', function () {
    console.log('connected to server');
    socket.emit('createMessage', {
        from: 'jen@example.com',
        text: 'Hey, This is Andrew'
    });
});

socket.on('disconnect', function ()  {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log("new Message", message);
});

socket.emit('createMessage', {from: 'User', text: 'example message'}, function (data) { console.log('Got it', data) });