import { execSync } from 'child_process';
import fs from 'fs';
import OSRM from 'osrm';
import Path from 'path';
import Socket from 'socket.io';

if (!fs.existsSync('../../../data/osrm/argentina')) {
    execSync('sh scripts/download-osrm.sh', { cwd: __dirname + '/../../..' });
}

let osrm = new OSRM({ 
    algorithm: 'MLD',
    path: Path.join(__dirname, '../../../data/osrm/argentina/argentina-latest.osrm'),
    use_shared_memory: false
});

let runners = {};

let sockets = {};

export const openSocket = (user, res) => {
    if (!sockets[user.id]) {
        let io = Socket(res.connection.server);
        let randomPort = Math.floor(Math.random() * (65535 - 49152 + 1) + 49152);
        
        io.listen(randomPort);

        io.on('connection', (socket) => {

            socket.on('refresh', (data) => {
                if (!runners[data.user]) {
                    runners[data.user] = {
                        coordinates: [],
                        distance: 0
                    };
                }

                runners[data.user].coordinates.push([data.longitude, data.latitude]);

                if (runners[data.user].coordinates.length >= 2) {
                    osrm.route({ coordinates: runners[data.user].coordinates }, (err, result) => {
                        if (err) throw err;
                        socket.emit('refresh', result);
                    });
                }
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