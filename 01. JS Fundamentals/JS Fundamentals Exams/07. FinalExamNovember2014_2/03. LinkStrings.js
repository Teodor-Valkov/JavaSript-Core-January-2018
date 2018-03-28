function solve (input) {
  let attributes = new Map();
  let regex = /(?:^|\?|&)([^/&=\s]+)=([^=&\s]+)/g;

  for (let line of input) {
    let match = regex.exec(line);

    while (match) {
      let key = updateEmptyPlaces(match[1]).trim();
      let value = updateEmptyPlaces(match[2]).trim();

      if (!attributes.has(key)) {
        attributes.set(key, []);
      }

      attributes.get(key).push(value);

      match = regex.exec(line);
    }

    let result = '';

    for (let [key, value] of attributes) {
      result += `${key}=[${value.join(', ')}]`;
    }

    console.log(result);
  }

  function updateEmptyPlaces (match) {
    return match
      .replace(/\+/g, ' ')
      .replace(/%20/g, ' ')
      .replace(/\s+/g, ' ');
  }
}

solve(['login=student&password=student']);
