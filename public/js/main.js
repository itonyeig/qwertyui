const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

var socket = io();// do this to bring io 





// // this is what connects us to the backend
// socket.on('message', (message) => {
// //console.log(message);
//   outPutMessage(message)

//   // scroll down
//   chatMessages.scrollTop = chatMessages.scrollHeight// chat scroll
//   window.scrollTo(0, document.body.scrollHeight);//window scroll

// })

// //when the user/client types in a message, the server gets it as a chat message event.
// chatForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   //get message test
//   const msg = e.target.elements.msg.value
  
//   //send the message the client/user typed in to the server (sends this message to all servers that are connected)
//   socket.emit('chatMessage', msg);
  
//   //clear input
//   e.target.elements.msg.value = ''
//   //focus on input
//   e.target.elements.msg.focus()
// })

// //DOM manipulation is done here so we can ouptut the messaage that the user/client keyed in
// function outPutMessage(message) {
//   const div = document.createElement('div')
//   const cls = ["container", "darker"];
//   div.classList.add(...cls)//class from html
//   div.innerHTML = `<img src=${message.imageTestLightUser} alt="Avatar" class="right">
//         <p>${message.text}</p>
//         <span class="time-left">${message.time}</span>`
//   //put it into the DOM
//   document.querySelector('.chat-messages').appendChild(div) 
  

// }

