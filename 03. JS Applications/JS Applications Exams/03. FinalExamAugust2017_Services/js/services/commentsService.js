let commentsService = (() => {
  function getAllCommentsByPostId(postId){
    return requester.get('appdata', `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, 'kinvey');
  }

  function createComment(comment) {
    return requester.post('appdata', 'comments', 'kinvey', comment);
  }  

  function deleteComment(commentId) {
    return requester.remove('appdata', `comments/${commentId}`, 'kinvey')
  }  

  return {
    getAllCommentsByPostId,
    createComment,
    deleteComment
  }
})()