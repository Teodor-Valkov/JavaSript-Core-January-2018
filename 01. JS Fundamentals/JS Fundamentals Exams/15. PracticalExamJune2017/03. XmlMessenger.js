function solve (input) {
  let regexMessage = /^<message((?:\s+[a-z]+="[A-Za-z0-9 .]+"\s*?)*)>((?:.|\n)+?)<\/message>$/;
  let regexAttributes = /\s+([a-z]+)="([A-Za-z0-9 .]+)"\s*?/g;

  let sender = '';
  let recipient = '';
  let result = '';

  let matches = regexMessage.exec(input);
  if (matches === null) {
    console.log('Invalid message format');
    return;
  }

  let attributes = matches[1];
  let message = matches[2];

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

    matchesAttributes = regexAttributes.exec(attributes);
  }

  if (sender === '' || recipient === '') {
    console.log('Missing attributes');
    return;
  }

  message = message.replace(/\n/g, '</p>\n    <p>');

  result += '<article>\n';
  result += `  <div>From: <span class="sender">${sender}</span></div>\n`;
  result += `  <div>To: <span class="recipient">${recipient}</span></div>\n`;
  result += `  <div>\n    <p>${message}</p>\n  </div>\n`;
  result += '</article>';

  console.log(result);
}

solve('<message o="Bob" from="Alice" timestamp="1497254092">Hey man, what\'s up?</message>');
// solve('<message from="John Doe" to="Alice">Not much, just chillin. How about you?</message>');
// solve('<message from="Alice" timestamp="1497254112">Same old, same old</message>');
// solve(`<message to="Bob" from="Alice" timestamp="1497254114">Same old, same old
// Let's go out for a beer</message>`);
// solve('<message to="Alice" from="Charlie"><img src="fox.jpg"/></message><meta version="2"/>');
// solve('<message from="Hillary" to="Edward" secret:true>VGhpcyBpcyBhIHRlc3Q</message>');
