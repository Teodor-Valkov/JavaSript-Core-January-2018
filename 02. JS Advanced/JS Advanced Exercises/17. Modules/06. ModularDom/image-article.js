let Article = require('./article.js');

class ImageArticle extends Article {
  constructor (title, content, image) {
    super(title, content);
    this.image = image;
  }

  getElementString () {
    let result = `<div class="article">\n`;

    result += `\t<div class="article-title">${this.title}</div>\n`;
    result += `\t<div class="image"><img src="${this.image}"></div>\n`;
    result += `\t<p>${this.content}</p>\n`;
    result += `</div>`;

    return result;
  }
}

module.exports = ImageArticle;
