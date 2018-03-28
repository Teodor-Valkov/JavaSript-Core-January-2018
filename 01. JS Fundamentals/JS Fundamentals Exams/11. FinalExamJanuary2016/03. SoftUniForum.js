function solve (input) {
  let banned = input.pop().split(' ');
  let text = input.join('\n');

  let codeRegex = /<code>[\s\S]+?<\/code>/g;
  let codeBlocks = [];

  let matchingCodeBlocks = codeRegex.exec(text);

  while (matchingCodeBlocks) {
    let codeBlock = matchingCodeBlocks[0];
    let codeReplacer = '#'.repeat(codeBlock.length - 1);

    text = text.replace(codeBlock, codeReplacer);
    codeBlocks.push({
      original: codeBlock,
      replaced: codeReplacer
    });

    matchingCodeBlocks = codeRegex.exec(text);
  }

  for (let bann of banned) {
    let censoredUserRegex = new RegExp(`#${bann}`, 'g');
    let match = censoredUserRegex.exec(text);

    while (match) {
      let username = match[0];
      let usernameReplacer = '*'.repeat(username.length - 1);

      text = text.replace(username, usernameReplacer);
      match = censoredUserRegex.exec(text);
    }
  }

  let validUserRegex = /#([A-Za-z][\w-]+[A-Za-z0-9])\b/g;
  let linkOpeningTag = '<a href="/users/profile/show/';
  let linkClosingTag = '</a>';

  text = text.replace(validUserRegex, (match, group) => `${linkOpeningTag}${group}">${group}${linkClosingTag}`);
  // text = text.replace(validUserRegex, `${linkOpeningTag}$1">$1${linkClosingTag}`);

  for (let codeBlock of codeBlocks) {
    text = text.replace(codeBlock.replaced, codeBlock.original);
  }

  console.log(text);
}

solve(['#RoYaL: I\'m not sure what you mean,',
  'but I am confident that I\'ve written',
  'everything correctly. Ask #iordan_93',
  'and #pesho if you don\'t believe me',
  '<code>',
  '#trying to print stuff',
  'print("yoo")',
  '</code>',
  'pesho gosho']);
