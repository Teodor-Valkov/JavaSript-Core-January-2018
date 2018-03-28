let Article = require('./article.js');

class TableArticle extends Article {
  constructor (title, content) {
    super(title, content);
    this.headings = null;
    this.data = null;
  }

  loadData (headings, data) {
    this.headings = headings;
    this.data = data;
  }

  getElementString () {
    let result = `<div class="article">\n`;

    result += `\t<div class="article-title">${this.title}</div>\n`;
    result += `\t<p>${this.content}</p>\n`;
    result += `\t<div class="table">\n`;
    result += `\t\t<table class="data">\n`;
    result += `\t\t\t<tr>`;

    for (let heading of this.headings) {
      result += `<th>${heading}</th>`;
    }

    result += `</tr>\n`;

    for (let obj of this.data) {
      result += `\t\t\t<tr>`;

      for (let property of Object.keys(obj)) {
        result += `<td>${obj[property]}`;
      }

      result += `</tr>\n`;
    }

    result += `\t\t</table>\n`;
    result += `\t</div>\n`;
    result += `</div>`;

    return result;
  }
}

module.exports = TableArticle;
