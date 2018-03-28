function solve (input) {
  let specialKey = input.shift();
  let regex = new RegExp(`(\\s|^)(${specialKey}\\s+)([A-Z!%$#]{8,})(\\s|\\.|,|$)`, 'gi');

  for (let line of input) {
    let match = regex.exec(line);

    while (match) {
      let word = match[3];

      if (word.toUpperCase() === word) {
        let replaceWord = transform(word);
        let replaceLine = match[1] + match[2] + replaceWord + match[4];

        line = line.replace(match[0], replaceLine);
      }

      match = regex.exec(line);
    }

    console.log(line);
  }

  function transform (word) {
    while (word.indexOf('!') !== -1) {
      word = word.replace('!', '1');
    }

    while (word.indexOf('%') !== -1) {
      word = word.replace('%', '2');
    }

    while (word.indexOf('#') !== -1) {
      word = word.replace('#', '3');
    }

    while (word.indexOf('$') !== -1) {
      word = word.replace('$', '4');
    }

    return word.toLowerCase();
  }
}

solve(['specialKey',
  'In this text the specialKey HELLOWORLD! is correct, but',
  'the following specialKey $HelloWorl#d and spEcIaLKEy HOLLOWORLD1 are not, while',
  'SpeCIaLkeY   SOM%%ETH$IN and SPECIALKEY ##$$##$$ are!']);
