function solve (input) {
  let banned = input.pop().split(/\s+/).filter(token => token !== '');
  let text = input.join('\n');

  let regex = /#([A-Za-z][\w-]+[A-Za-z0-9])\b|<code>[\w\W]+?<\/code>/g;
  let openingTag = '<a href="/users/profile/show/';
  let closingTag = '</a>';

  let match = regex.exec(text);

  while (match) {
    if (match[0].match(/<code>[\w\W]+?<\/code>/)) {
      match = regex.exec(text);
      continue;
    }

    let username = match[1];

    if (banned.some(ban => ban === username)) {
      let bannReplacer = '*'.repeat(username.length);
      text = text.replace(`#${username}`, bannReplacer);
    } else {
      let usernameReplacer = openingTag + username + '">' + username + closingTag;
      text = text.replace(`#${username}`, usernameReplacer);
    }

    match = regex.exec(text);
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
