function solve (input) {
  let text = input[0];
  let regex = /<p>(.*?)<\/p>/g;

  let result = '';

  let CHAR_CODE_A = 'a'.charCodeAt(0);
  let CHAR_CODE_M = 'm'.charCodeAt(0);
  let CHAR_CODE_Z = 'z'.charCodeAt(0);

  let match = regex.exec(text);

  while (match != null) {
    let replacedText = match[1].replace(/[^a-z0-9]+/g, ' ');

    for (let letter of replacedText) {
      let newLetter = '';

      if (letter.charCodeAt(0) >= CHAR_CODE_A && letter.charCodeAt(0) <= CHAR_CODE_M) {
        letter = letter.charCodeAt(0) + 13;
        newLetter = String.fromCharCode(letter);
      } else if (letter.charCodeAt(0) > CHAR_CODE_M && letter.charCodeAt(0) <= CHAR_CODE_Z) {
        letter = letter.charCodeAt(0) - 13;
        newLetter = String.fromCharCode(letter);
      } else {
        newLetter = letter;
      }

      result += newLetter;
    }

    match = regex.exec(text);
  }

  console.log(result);
}

solve(['<html><head><title></title></head><body><h1>hello</h1><p>znahny!@#%&&&&****</p><div><button>dsad</button></div><p>grkg^^^^%%%)))([]12</p></body></html>']);
