const path = require('path')
const express = require('express');
const formatMessage = require('./utils/messages')
const app = express();
const http = require('http');
const server = http.createServer(app);//// initializes app to be a function handler that you can supply to an HTTP server

// Integrating Socket.IO
const { Server } = require("socket.io");
const io = new Server(server);


//set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Listen for connection event for incoming sockets and log it to the console
io.on('connection', (socket) => {
  console.log('new webservice connection');

  //broadcasts only to the client that just connected
  // socket.emit('message', 'link is established on the front end');
  
  //broadcast to clients already connected that a new client is connected. New client does not get this broadcast
  socket.broadcast.emit('message', 'a user has joined the chat');

  // this runs when a client disconnects
  

  //send message. broadcast to all clients connected.
  // io.emit()

  //disconnect

  //listen for 'chatMessage' from client/user
  socket.on('chatMessage', (msg) => {
    //emitts it to all users
    io.emit('message', formatMessage('USER', msg))
  })
});




const PORT = process.env.PORT || 2000;

//  my server now listents to connections on the PORT connection
server.listen(PORT, () => {
  console.log(`***Server is running on ${PORT}***`);
})