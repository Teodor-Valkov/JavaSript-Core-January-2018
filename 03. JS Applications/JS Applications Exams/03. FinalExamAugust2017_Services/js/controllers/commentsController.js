let commentsController = (() => {
  // Create Comment POST
  function createComment (context) {
    let content = context.params.content;
    let author = sessionStorage.getItem('username');
    let postId = location.hash.substr(location.hash.indexOf(':') + 1);

    let comment = {
      content,
      author,
      postId
    };

    commentsService.createComment(comment)
      .then(function () {
        notification.showInfo('Comment created.');
        context.redirect(`#/details/:${postId}`);
      })
      .catch(notification.displayError)
  };

  // Delete Comment DELETE
  function deleteComment (context) {
    let commentId = context.params.id.substr(1);

    commentsService.deleteComment(commentId)
      .then(function () {
        notification.showInfo('Comment deleted.');
        window.history.go(-1);
      })
      .catch(notification.displayError)
  };

  return {
    createComment,
    deleteComment
  }
})()