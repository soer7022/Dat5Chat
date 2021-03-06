var express = require('express');
var socket = require('socket.io');
var chathistory = [];

// App setup
var app = express();
var server = app.listen(80, function () {
    console.log("Listening to request on port 80")
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection',function (socket) {
   console.log("Connection established id: ", socket.id);
   var chathistoryString = JSON.stringify(chathistory);
   chathistoryString = chathistoryString.replace(/["]|[\[\]']|[,]+/g, '');
   socket.emit('chathistory',chathistoryString);

    socket.on('chat', function (data) {
        io.sockets.emit('chat',data);
        chathistory.push('<p><strong>' + data.handle + ': </strong>' + data.message + '</p>');
        chathistory.slice(-100);
    });

    socket.on('typing', function (data) {
        //console.log(data);
        socket.broadcast.emit('typing',data);
    });
});