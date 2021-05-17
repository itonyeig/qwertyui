const path = require('path')
const express = require('express')
const app = express();
// Initialization of socket.io on server
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);

const formatMessage = require('./utils/messages')
const { userJoins, getCurrentUser } = require('./utils/users')
//set static folder



app.use(express.static(path.join(__dirname, 'public')))

//**********changes begin here*********

// I  register a middleware which checks the username and allows the connection:
// io.use((socket, next) => {
//   const username = socket.handshake.auth.username;
//   console.log(username);
//   next();
// })

io.on('connection', (socket) => {
  
  //listen for message from server
  socket.on('chatMessages', (msg) => {
    //emit on message to all users
    io.emit('message', msg)
  })

  socket.on('username', (username) => {
    const users = userJoins(socket.id, username);
    // const user = getCurrentUser(socket.id)
    
  
    // we send all existing users to the client:
    io.emit("users", (users));
  
  })

  
});




const PORT = process.env.PORT || 3000;

//  my server now listents to connections on the PORT connection
httpServer.listen(PORT, () => {
  console.log(`***Server is running on ${PORT}***`);
})

