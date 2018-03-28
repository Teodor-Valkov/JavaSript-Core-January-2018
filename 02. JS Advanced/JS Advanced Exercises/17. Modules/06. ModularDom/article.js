let BaseElement = require('./base-element.js');

class Article extends BaseElement {
  constructor (title, content) {
    super();
    this.title = title;
    this.content = content;
    this.timestamp = new Date();
  }

  getElementString () {
    let result = `<div class="article">\n`;

    result += `\t<div class="article-title">${this.title}</div>\n`;
    result += `\t<p>${this.content}</p>\n`;
    result += `</div>`;

    return result;
  }
}

module.exports = Article;
