let chirpsService = (() => {
  function getAllChirpsByUsername(username) {
    return requester.get('appdata', `chirps?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, 'kinvey')
  }

  function getAllChirpsByFollowing(following) {
    return requester.get('appdata', `chirps?query={"author":{"$in": [${following}]}}&sort={"_kmd.ect": -1}`, 'kinvey');
  }

  function createChirp(chirp) {
    return requester.post('appdata', 'chirps', 'kinvey', chirp);
  }

  function deleteChirp(chirpId) {
    return requester.remove('appdata', `chirps/${chirpId}`, 'kinvey');
  }

  return {
    getAllChirpsByUsername,
    getAllChirpsByFollowing,
    createChirp,
    deleteChirp
  }
})()