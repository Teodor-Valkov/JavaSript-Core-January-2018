let usersService = (() => {
  function getAllUsers() {
    return requester.get('user', '', 'kinvey');
  }

  function getUserByUsername(username) {
    return requester.get('user', `?query={"username":"${username}"}`, 'kinvey');
  }

  function getAllFollowersByUsername(username) {
    return requester.get('user', `?query={"subscriptions":"${username}"}`, 'kinvey');
  }

  function updateUser(userId, user) {
    return requester.update('user', userId, 'kinvey', user);
  }

  return {
    getAllUsers,
    getUserByUsername,
    getAllFollowersByUsername,
    updateUser
  }
})()