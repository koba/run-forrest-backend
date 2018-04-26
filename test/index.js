const Socket = require('socket.io-client');

var socket = Socket('http://localhost:' + process.argv[2]);

socket.emit('refresh', {
    user: '5ae0e171677187162a948b8a',
    latitude: -34.503722, // user lat
    longitude: -58.281592  // user lon
});

socket.emit('refresh', {
    user: '5ae0e171677187162a948b8a',
    latitude: -32.503722, // user lat
    longitude: -56.281592  // user lon
});

socket.on('refresh', (data) => {
    console.log(data);
});