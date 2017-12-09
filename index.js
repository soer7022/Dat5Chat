var express = require('express');
var socket = require('socket.io');

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

    socket.on('chat', function (data) {
        io.sockets.emit('chat',data);
    })
});