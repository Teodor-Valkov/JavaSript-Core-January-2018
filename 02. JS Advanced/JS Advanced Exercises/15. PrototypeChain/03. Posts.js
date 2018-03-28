function solve () {
  class Post {
    constructor (title, content) {
      this.title = title;
      this.content = content;
    }

    toString () {
      return `Post: ${this.title}\nContent: ${this.content}`;
    }
  }

  class SocialMediaPost extends Post {
    constructor (title, content, likes, dislikes) {
      super(title, content);
      this.likes = Number(likes);
      this.dislikes = Number(dislikes);
      this.comments = [];
    }

    addComment (comment) {
      this.comments.push(comment);
    }

    toString () {
      let result = `${super.toString()}\nRating: ${this.likes - this.dislikes}`;

      if (this.comments.length > 0) {
        result += '\nComments:\n';
        result += this.comments.map(comment => ` * ${comment}`).join('\n');
      }

      return result;
    }
  }

  class BlogPost extends Post {
    constructor (title, content, views) {
      super(title, content);
      this.views = Number(views);
    }

    view () {
      this.views++;
      return this;
    }

    toString () {
      return super.toString() + `\nViews: ${this.views}`;
    }
  }

  return { Post, SocialMediaPost, BlogPost };
}

let result = solve();

let post = new result.Post('Post', 'Content');
console.log(post.toString());
console.log('=====================');

let socialMediaPost = new result.SocialMediaPost('Social Media Pot', 'content', 10, 10);
socialMediaPost.addComment('First');
socialMediaPost.addComment('Second');
socialMediaPost.addComment('Third');
console.log(socialMediaPost.toString());
console.log('=====================');

let blogPost = new result.BlogPost('Blog Post', 'Content', 10);
blogPost.view();
blogPost.view();
blogPost.view();
console.log(blogPost.toString());
