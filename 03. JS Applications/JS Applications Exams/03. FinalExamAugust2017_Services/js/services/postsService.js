let postsService = (() => {
  function getAllPosts() {
    return requester.get('appdata', 'posts?query={}&sort={"_kmd.ect": -1}', 'kinvey');
  }

  function getAllPostsByUsername(username) {
    return requester.get('appdata', `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, 'kinvey');
  }

  function getPostDetailsByPostId(postId) {
    return requester.get('appdata', `posts/${postId}`, 'kinvey');
  }

  function createPost(post) {
    return requester.post('appdata', 'posts', 'kinvey', post);
  }

  function editPost(postId, post) {
    return requester.update('appdata', `posts/${postId}`, 'kinvey', post);
  }

  function deletePost(postId) {
    return requester.remove('appdata', `posts/${postId}`, 'kinvey');
  }

  return {
    getAllPosts,
    getAllPostsByUsername,
    getPostDetailsByPostId,
    createPost,
    editPost,
    deletePost
  }
})()