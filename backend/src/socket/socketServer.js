const { Server } = require('socket.io');

let io; // scope global

const CreateSocketServer = (server) => {
  io = new Server(server, {
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

function getIo() {
  if (!io) {
    throw new Error('Socket io no esta disponible');
  }
  return io;
}

module.exports = {
  CreateSocketServer,
  getIo,
};
