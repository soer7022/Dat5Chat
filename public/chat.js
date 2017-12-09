// Make connection
var socket = io.connect();

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    chat = document.getElementById('chat-window');

// Emit events
btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        handle: handle.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    });
    message.value = "";
});

message.addEventListener('keypress',function () {
    socket.emit('typing', handle.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
});

//Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    chat.scrollTop = chat.scrollHeight;
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});