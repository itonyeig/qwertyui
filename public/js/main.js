const chatForm = document.getElementById('chat-form')

var socket = io();// do this to bring io

//when the user types in a message, the server gets it as a chat message event.
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value
  console.log(msg);
})
// this is what connects us to the backend
socket.on('message', (message) => {
  console.log(message);
})

