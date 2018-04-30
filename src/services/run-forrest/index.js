import OSRM from 'osrm';
import Path from 'path';
import Socket from 'socket.io';

let osrm = new OSRM({ 
    algorithm: 'MLD',
    path: Path.join(__dirname, '../../../data/osrm/argentina/argentina-latest.osrm'),
    use_shared_memory: false
});

let runs = {};

let sockets = {};

export const openSocket = (user, res) => {
    if (!sockets[user.id]) {
        let io = Socket(res.connection.server);
        let randomPort = Math.floor(Math.random() * (65535 - 49152 + 1) + 49152);
        
        io.listen(randomPort);

        io.on('connection', (socket) => {

            socket.on('refresh', (data) => {
                if (!runs[data.run]) {
                    runs[data.run] = {
                        runners: {}
                    }
                }

                if (!runs[data.run]['runners'][data.user]) {
                    runs[data.run]['runners'][data.user] = {
                        coordinates: [],
                        route: null
                    };
                }

                runs[data.run]['runners'][data.user].coordinates.push([data.longitude, data.latitude]);

                if (runs[data.run]['runners'][data.user].coordinates.length >= 2) {
                    osrm.route({ coordinates: runs[data.run]['runners'][data.user].coordinates }, (err, result) => {
                        if (err) throw err;
                        
                        runs[data.run]['runners'][data.user].route = result.routes[0],
                        socket.emit('refresh', runs[data.run]['runners'][data.user]);
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

export const runState = (id) => {
    return runs[id];
}