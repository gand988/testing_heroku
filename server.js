// heroku server config
// create an HTTP server
const express = require('express'); 
const socketIO = require('socket.io'); 

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`listening on ${PORT}`));

// create a socket.io server
const io = socketIO(server);

// handle connections

io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('disconnect', () => console.log('client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

