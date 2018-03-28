function solve (input) {
  let regexMessage = /^<message((?:\s[a-z]+="[A-Za-z0-9 .]+")*)>((?:.|\n)+?)<\/message>$/;
  let regexTo = /\bto="([A-Za-z0-9 .]+)"/;
  let regexFrom = /\bfrom="([A-Za-z0-9 .]+)"/;
  let result = '';

  let match = regexMessage.exec(input);

  if (match !== null) {
    let to = regexTo.exec(match[1]);
    let from = regexFrom.exec(match[1]);

    if (to !== null && from !== null) {
      result += `<article>\n`;
      result += `  <div>From: <span class="sender">${from[1]}</span></div>\n`;
      result += `  <div>To: <span class="recipient">${to[1]}</span></div>\n  <div>\n`;

      let messages = match[2].split('\n');

      for (let i = 0; i < messages.length; i++) {
        result += `    <p>${messages[i]}</p>\n`;
      }

      result += '  </div>\n';
      result += '</article>';

      console.log(result);
    } else {
      console.log('Missing attributes');
    }
  } else {
    console.log('Invalid message format');
  }
}

// solve('<message to="Bob" from="Alice" timestamp="1497254092">Hey man, what\'s up?</message>')
// solve('<message from="John Doe" to="Alice">Not much, just chillin. How about you?</message>')
// solve('<message from="Alice" timestamp="1497254112">Same old, same old</message>')
solve('<message to="Bob" from="Alice" timestamp="1497254114">Same old, same old\n' +
  'Let\'s go out for a beer</message>');
// solve('<message to="Alice" from="Charlie"><img src="fox.jpg"/></message><meta version="2"/>')
// solve'<message from="Hillary" to="Edward" secret:true>VGhpcyBpcyBhIHRlc3Q</message>')
