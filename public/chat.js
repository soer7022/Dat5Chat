// Make connection
var socket = io.connect();

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        handle: handle.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    });
    message.value = "";
});

//Listen for events
socket.on('chat', function (data) {
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
});
