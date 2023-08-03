const socket = io("http://localhost:5000");
var config
fetch('default_config.json')
.then(response => response.json())
.then(jsonData => {
    // Set the value of the textarea with the JSON data from the file
    document.getElementById('jsonInput').value = JSON.stringify(jsonData, null, 2);
})

// Handle 'connect' event
socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
});

// Handle 'disconnect' event
socket.on('disconnect', function (reason) {
    console.log('Socket disconnected because of ' + reason);
});

socket.on('status_update', message => {
    for (var key in message) {
        if (message.hasOwnProperty(key)) {
            document.getElementById('jsonOutput').value += JSON.stringify(message[key]["transcript"], null, 2);
            document.getElementById('analysisOutput').value += JSON.stringify(message[key]["analysis"], null, 2);
        }
    }

});

function runTTA(){
    var config = document.getElementById('jsonInput').value;
    socket.emit('start_tta', JSON.parse(config));
}