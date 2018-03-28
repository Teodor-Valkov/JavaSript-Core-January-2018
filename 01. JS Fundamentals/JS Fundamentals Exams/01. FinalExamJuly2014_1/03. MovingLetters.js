function solve (input) {
  let words = input[0].split(' ');

  let longestWordLength = 0;

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWordLength) {
      longestWordLength = words[i].length;
    }
  }

  let letters = [];

  for (let i = 0; i < longestWordLength; i++) {
    for (let j = 0; j < words.length; j++) {
      if (words[j] === undefined) {
        continue;
      }

      let lastLetter = words[j][words[j].length - 1];

      letters.push(lastLetter);

      if (words[j].length === 1) {
        delete words[j];
        j--;
        continue;
      }

      words[j] = words[j].substring(0, words[j].length - 1);
    }
  }

  for (let i = 0; i < letters.length; i++) {
    let currentLetter = letters[i];
    let asciiNumber = currentLetter.toLowerCase().charCodeAt(0);
    let numberMoves = asciiNumber - 97 + 1;

    moveCharToNewPos(letters, i, numberMoves);
  }

  function moveCharToNewPos (letters, i, numberMoves) {
    let currentLetter = letters[i];
    letters.splice(i, 1);

    let newPosition = (i + numberMoves) % (letters.length + 1);
    letters.splice(newPosition, 0, currentLetter);
  }

  console.log(letters.join(''));
}

solve(['fun exam right']);
