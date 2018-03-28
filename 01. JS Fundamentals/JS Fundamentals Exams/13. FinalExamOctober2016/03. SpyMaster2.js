function solve (input) {
  let specialKey = input.shift();
  let regex = new RegExp(`( |^)(${specialKey}\\s+)([A-Z!%$#]{8,})( |\\.|,|$)`, 'gi');
  let result = [];

  for (let line of input) {
    let match = regex.exec(line);

    while (match) {
      let word = match[3];
      let replaceWord = '';

      if (isWordValid(word)) {
        for (let letter of word) {
          switch (letter) {
            case '!': replaceWord += 1; break;
            case '%': replaceWord += 2; break;
            case '#': replaceWord += 3; break;
            case '$': replaceWord += 4; break;
            default: replaceWord += letter.toLowerCase();
          }
        }
      }

      let replaceline = match[1] + match[2] + replaceWord + match[4];
      line = line.replace(match[0], replaceline);

      match = regex.exec(line);
    }

    result.push(line);
  }

  console.log(result.join('\n'));

  function isWordValid (word) {
    let regex = /^[A-Z!%$#]+$/;
    return regex.test(word);
  }
}

solve(['specialKey',
  'In this text the specialKey HELLOWORLD! is correct, but',
  'the following specialKey $HelloWorl#d and spEcIaLKEy HOLLOWORLD1 are not, while',
  'SpeCIaLkeY   SOM%%ETH$IN and SPECIALKEY ##$$##$$ are!']);
