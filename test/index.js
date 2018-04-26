const Socket = require('socket.io-client');

var socket = Socket('http://agurz.ddns.net:' + process.argv[2]);

socket.emit('refresh', {
    user: '5ae0e171677187162a948b8a',
    run: '5ae1fc2d861bb81bea245ec8',
    latitude: -34.603722, // user lat
    longitude: -58.381592  // user lon
});

socket.emit('refresh', {
    user: '5ae0e171677187162a948b8a',
    run: '5ae1fc2d861bb81bea245ec8',
    latitude: -37.979858, // user lat
    longitude: -57.589794  // user lon
});

socket.on('refresh', (data) => {
    console.log(data);
});