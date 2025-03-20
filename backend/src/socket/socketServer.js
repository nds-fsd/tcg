const { Server } = require('socket.io');

const CreateSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });

    io.on('connection', (socket) => {
        console.log(`${socket.id} Connected`);

        io.emit('ping', {
            form: 'Server',
            body: 'Te mando un ping',
        });

        socket.on('pong', (message) => {
            console.log('He recibido el pong:', message);
        });
    });

    io.on('disconnect', (socket) => {
        console.log(`User ${socket.user.name} has disconnected`);
    });
    return io;
};

module.exports = {
    CreateSocketServer,
};
