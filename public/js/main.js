const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const { username } = Qs.parse(location.search, {ignoreQueryPrefix:true})//get usernames from url
const socket = io(); //initialized Socket.IO on the client side
const userList = document.getElementById('users')
const currentUser = document.getElementById('user-name')

let usernameAlreadySelected = false;

socket.emit('username', username)

socket.on('message', (message) => {
  outPutMessage(message)
     // scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight// chat scroll
  window.scrollTo(0, document.body.scrollHeight);//window scroll
});

//get list 
socket.on("users", (users) => {
  
  //find the current user
  const user = users.find(user => user.id === socket.id);

  outputCurrentUser(user)
  outPutAllUsers(users, socket.id)


});




chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  //get typed in message
  const msg = e.target.elements.msg.value
  //emitt message to the server
  socket.emit('chatMessages', msg)

   //clear input
   e.target.elements.msg.value = ''
   //focus on input
   e.target.elements.msg.focus()
})


// DOM manipulation is done here so we can ouptut the messaage that the user/client keyed in
function outPutMessage(message) {
  const div = document.createElement('div')
  const cls = ["container", "darker"];
  div.classList.add(...cls)//class from html
  div.innerHTML = `<img src=${message.imageTestLightUser} alt="Avatar" class="right">
        <p>${message}</p>
        <span class="time-left">${message.time}</span>`
  //put it into the DOM
  document.querySelector('.chat-messages').appendChild(div) 
}

//Add current user's name to DOM
function outputCurrentUser(user) {
  currentUser.innerHTML = user.username
}

//Add users to DOM
function outPutAllUsers(users, id) {
  //filter out the non current user
  users = users.filter((users) =>  users.id !== id)

  //sort to arrange the users alphabetically
  users = users.sort((a, b) => {
    if(a.username > b.username){
      return 1
    } else {
      return -1
    }
  })

  // put sorted and filtered users into dom

  userList.innerHTML = `
  ${users.map(user => 
    `<li onclick="privateMessage('${user.username}')">${user.username}</li>`
  ).join('')}
  `
}

let chatContext = {};

function privateMessage(user)
{
  // clear the right hand side 
  console.log(user);

  let chatbox = document.getElementsByClassName('chat-messages')[0];
  if (chatContext[user])
  {
    chatbox.childNodes = JSON.parse(chatContext[user]);
  }
  else
  {
    chatContext[user] = JSON.stringify(chatbox.childNodes);
    while (chatbox.childNodes.length > 0)
    {
      chatbox.removeChild(chatbox.childNodes[0]);
    }
  }
}


