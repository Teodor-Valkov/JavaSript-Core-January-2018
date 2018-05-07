let postsController = (() => {
  // All Posts
  function allPosts(context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    postsService.getAllPosts()
      .then((posts) => {
        let rank = 1;

        for (let post of posts) {
          post.rank = rank++;
          post.time = calcTime(post._kmd.ect);
          post.isPostAuthor = username === post.author;

          if (!post.description) {
            post.description = 'No description';
          }
        }

        context.postList = posts;

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            navigation: './templates/common/navigation.hbs',
            page: './templates/posts/catalog.hbs',
            postItem: './templates/posts/postItem.hbs'
          })
          .then(function () {
            this.partial('./templates/main.hbs')
          });
      })
      .catch(notification.displayError);
  }

  // My Posts
  function myPosts(context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    postsService.getAllPostsByUsername(username)
      .then((posts) => {
        let rank = 1;

        for (let post of posts) {
          post.rank = rank++;
          post.time = calcTime(post._kmd.ect);
          post.isPostAuthor = true;

          if (!post.description) {
            post.description = 'No description';
          }
        }

        context.postList = posts;

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            navigation: './templates/common/navigation.hbs',
            page: './templates/posts/myPosts.hbs',
            postItem: './templates/posts/postItem.hbs'
          })
          .then(function () {
            this.partial('./templates/main.hbs')
          });
      })
      .catch(notification.displayError);
  }

  // Post Details
  function postDetails(context) {
    let postId = context.params.id.substr(1);
    let username = sessionStorage.getItem('username');
    context.username = username;

    postsService.getPostDetailsByPostId(postId)
      .then((post) => {
        post.time = calcTime(post._kmd.ect);

        if (!post.description) {
          post.description = 'No description';
        }

        commentsService.getAllCommentsByPostId(postId)
          .then((comments) => {
            for (let comment of comments) {
              comment.time = calcTime(comment._kmd.ect);
              comment.isCommentAuthor = username === comment.author;
            }

            context.isPostAuthor = username === post.author;
            context.post = post;
            context.commentList = comments;

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs',
                commentForm: './templates/comments/commentForm.hbs',
                commentItem: './templates/comments/commentItem.hbs',
                page: './templates/posts/postDetails.hbs'
              })
              .then(function () {
                this.partial('./templates/main.hbs')
              });
          })
          .catch(notification.displayError);
      })
      .catch(notification.displayError);
  }

  // Post Details by Promise All
  function postDetailsByPromiseAll(context) {
    let postId = context.params.id.substr(1);
    let username = sessionStorage.getItem('username');
    context.username = username;

    let postRequest = postsService.getPostDetailsByPostId(postId);
    let commentsRequest = commentsService.getAllCommentsByPostId(postId);

    Promise.all([postRequest, commentsRequest])
      .then(([post, comments]) => {
        post.time = calcTime(post._kmd.ect);

        if (!post.description) {
          post.description = 'No description';
        }

        for (let comment of comments) {
          comment.time = calcTime(comment._kmd.ect);
          comment.isCommentAuthor = username === comment.author;
        }

        context.isPostAuthor = username === post.author;
        context.post = post;
        context.commentList = comments;

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            navigation: './templates/common/navigation.hbs',
            commentForm: './templates/comments/commentForm.hbs',
            commentItem: './templates/comments/commentItem.hbs',
            page: './templates/posts/postDetails.hbs'
          })
          .then(function () {
            this.partial('./templates/main.hbs')
          });
      })
      .catch(notification.displayError);
  }

  // Create Post GET
  function createPostGet(context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        navigation: './templates/common/navigation.hbs',
        page: './templates/posts/createPost.hbs'
      })
      .then(function () {
        this.partial('./templates/main.hbs');
      });
  }

  // Create Post POST
  function createPostPost(context) {
    let url = context.params.url;
    let title = context.params.title;
    let imageUrl = context.params.image;
    let description = context.params.comment;
    let author = sessionStorage.getItem('username');

    if (!validateUrl(url)) {
      return;
    }

    if (!validateTitle(title)) {
      return;
    }

    let post = {
      url,
      title,
      imageUrl,
      description,
      author
    };

    postsService.createPost(post)
      .then(function () {
        notification.showInfo('Post created.');
        context.redirect('#/catalog')
      })
      .catch(notification.displayError)
  }

  // Edit Post GET
  function editPostGet(context) {
    let postId = context.params.id.substr(1);
    let username = sessionStorage.getItem('username');
    context.username = username;

    postsService.getPostDetailsByPostId(postId)
      .then(function (post) {
        context.id = post._id;
        context.url = post.url;
        context.title = post.title;
        context.imageUrl = post.imageUrl;
        context.description = post.description;

        context.loadPartials({
          header: 'templates/common/header.hbs',
          footer: 'templates/common/footer.hbs',
          navigation: './templates/common/navigation.hbs',
          page: './templates/posts/editPost.hbs'
        }).then(function () {
          this.partial('./templates/main.hbs');
        })
      })
      .catch(notification.displayError);
  }

  // Edit Post POST
  function editPostPost(context) {
    let postId = context.params.id.substr(1);
    let url = context.params.url;
    let title = context.params.title;
    let imageUrl = context.params.image;
    let description = context.params.description;
    let author = sessionStorage.getItem('username');

    if (!validateUrl(url)) {
      return;
    }

    if (!validateTitle(title)) {
      return;
    }

    let post = {
      url,
      title,
      imageUrl,
      description,
      author
    };

    postsService.editPost(postId, post)
      .then(function () {
        notification.showInfo(`Post ${title} updated!`);
        context.redirect('#/catalog');
      })
      .catch(notification.displayError);
  }

  // Delete Post
  function deletePost(context) {
    let postId = context.params.id.substr(1);

    postsService.deletePost(postId)
      .then(function () {
        notification.showInfo('Post deleted.');
        context.redirect('#/catalog');
      })
      .catch(notification.displayError)
  }

  function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
      if (value !== 1) return 's';
      else return '';
    }
  }

  function validateUrl(url) {
    if (!url) {
      notification.showError('URL cannot be empty.');
      return false;
    }

    if (!url.startsWith('http')) {
      notification.showError('URL should start wih "http".');
      return false;
    }

    return true;
  }

  function validateTitle(title) {
    if (!title) {
      notification.showError('Title cannot be empty.');
      return false;
    }

    return true;
  }

  return {
    allPosts,
    myPosts,
    postDetails,
    postDetailsByPromiseAll,
    createPostGet,
    createPostPost,
    editPostGet,
    editPostPost,
    deletePost
  }
})()