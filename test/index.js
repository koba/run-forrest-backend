const Socket = require('socket.io-client');

var socket = Socket('http://agurz.ddns.net:' + process.argv[2]);

socket.emit('refresh', {
    user: '5ae1d52121da2b18b45d7435',
    latitude: -34.603722, // user lat
    longitude: -58.381592  // user lon
});

socket.emit('refresh', {
    user: '5ae1d52121da2b18b45d7435',
    latitude: -37.979858, // user lat
    longitude: -57.589794  // user lon
});

socket.on('refresh', (data) => {
    console.log(data);
});