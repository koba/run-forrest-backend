//import OSRM from 'osrm';
import Socket from 'socket.io';

//let osrm = new OSRM('../../../data/osrm/argentina/argentina-latest.osrm');

let sockets = {};

export const openSocket = (user, res) => {
    if (!sockets[user.id]) {
        let io = Socket(res.connection.server);
        let randomPort = Math.floor(Math.random() * (65535 - 49152 + 1) + 49152);
        
        io.listen(randomPort);

        io.on('connection', (socket) => {

            socket.on('accept-truck-request', (data) => {
            
            });

        });

        console.log(`opened port ${randomPort} for user ${user.id}`);

        sockets[user.id] = { 
            io: io,
            port: randomPort 
        };
    }
    
    return {
        ip: '::1', // will be useful in the future
        port: sockets[user.id].port
    };
};