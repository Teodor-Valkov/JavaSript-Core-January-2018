let BaseElement = require('./base-element.js');

class TitleBar extends BaseElement {
  constructor (title) {
    super();
    this.title = title;
    this.links = [];
  }

  addLink (href, name) {
    this.links.push({href: href, name: name});
  }

  getElementString () {
    let result = `<header class="header">\n`;

    result += `\t<div><span class="title">${this.title}</span></div>\n`;
    result += `\t<div>\n`;
    result += `\t\t<nav class="menu">\n`;

    for (let link of this.links) {
      result += `\t\t\t<a class="menu-link" href="${link.href}">${link.name}</a>\n`;
    }

    result += `\t\t</nav>\n`;
    result += `\t</div>\n`;
    result += `</header>`;

    return result;
  }
}

module.exports = TitleBar;
