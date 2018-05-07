$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('index.html', homeController.index);
    this.get('#/home', homeController.index);

    // Authentication
    this.post('#/login', usersController.loginPost);
    this.post('#/register', usersController.registerPost);
    this.get('#/logout', usersController.logout);

    // All Posts
    this.get('#/catalog', postsController.allPosts);
    
    // My Posts
    this.get('#/myPosts', postsController.myPosts);
   
    // Post Details
    //this.get('#/details/:id', postsController.postDetails);
    this.get('#/details/:id', postsController.postDetailsByPromiseAll);

    // Create Post
    this.get('#/createPost', postsController.createPostGet);
    this.post('#/createPost', postsController.createPostPost);    

    // Edit Post
    this.get('#/editPost/:id', postsController.editPostGet);
    this.post('#/editPost/:id', postsController.editPostPost);
    
    // Delete Post
    this.get('#/deletePost/:id', postsController.deletePost);

    // Create Comment
    this.post('#/createComment', commentsController.createComment)
    
    // Delete Comment
    this.get('#/deleteComment/:id', commentsController.deleteComment)
  });

  app.run();
});