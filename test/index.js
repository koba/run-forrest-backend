const Socket = require('socket.io-client');

var socket = Socket('https://ec2-34-237-245-91.compute-1.amazonaws.com:' + process.argv[2]);

socket.emit('refresh', {
    user: '5ae0e171677187162a948b8a',
    latitude: -34.603722, // user lat
    longitude: -58.381592  // user lon
});

socket.emit('refresh', {
    user: '5ae0e171677187162a948b8a',
    latitude: -37.979858, // user lat
    longitude: -57.589794  // user lon
});

socket.on('refresh', (data) => {
    console.log(data);
});