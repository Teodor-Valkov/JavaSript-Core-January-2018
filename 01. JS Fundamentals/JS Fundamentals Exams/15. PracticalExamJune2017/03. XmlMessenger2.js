function solve (input) {
  // let regexMessage = /^<message(.+?)>((.|\n)+?)<\/message>$/;
  // let regexMessage = /^<message(.+?)>([\s\S]+)<\/message>$/;
  let regexMessage = /^<message(.+?)>([\w\W]+)<\/message>$/;
  let regexAttributes = /\s+(?:([a-z]+)="([A-Za-z0-9 .]+))"/g;

  let length = 0;
  let sender = '';
  let recipient = '';
  let result = '';

  let matchesMessage = regexMessage.exec(input);

  if (matchesMessage === null) {
    console.log('Invalid message format');
    return;
  }

  let attributes = matchesMessage[1];
  let message = matchesMessage[2];

  let matchesAttributes = regexAttributes.exec(attributes);
  while (matchesAttributes) {
    let key = matchesAttributes[1];
    let value = matchesAttributes[2];

    if (key === 'from') {
      sender = value;
    }

    if (key === 'to') {
      recipient = value;
    }

    length += matchesAttributes[0].length;

    matchesAttributes = regexAttributes.exec(attributes);
  }

  if (length !== attributes.length) {
    console.log('Invalid message format');
    return;
  }

  if (sender === '' || recipient === '') {
    console.log('Missing attributes');
    return;
  }

  result += '<article>\n';
  result += `  <div>From: <span class="sender">${sender}</span></div>\n`;
  result += `  <div>To: <span class="recipient">${recipient}</span></div>\n`;
  result += '  <div>\n';

  for (let line of message.split('\n')) {
    result += `    <p>${line.trim()}</p>\n`;
  }

  result += '  </div>\n';
  result += '</article>\n';

  console.log(result);
}

solve('<message to="Bob" from="Alice" timestamp="1497254092">Hey man, what\'s up?</message>');
// solve('<message from="John Doe" to="Alice">Not much, just chillin. How about you?</message>');
// solve('<message from="Alice" timestamp="1497254112">Same old, same old</message>');
// solve(`<message to="Bob" from="Alice" timestamp="1497254114">Same old, same old
//   Let's go out for a beer</message>`);
// solve('<message to="Alice" from="Charlie"><img src="fox.jpg"/></message><meta version="2"/>');
// solve('<message from="Hillary" to="Edward" secret:true>VGhpcyBpcyBhIHRlc3Q</message>');
