const users = []

//join user to chat
function userJoins(id, username) {
  const user = { id, username }
  //add the newly joined user to the users array
  users.push(user)

  return users
}

//get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

module.exports = {
  userJoins,
  getCurrentUser
};