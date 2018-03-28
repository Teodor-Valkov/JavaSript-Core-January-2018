function solve (input) {
  let words = input[0].split(/[^a-zA-Z]+/);

  let result = [];

  for (let a = 0; a < words.length; a++) {
    for (let b = 0; b < words.length; b++) {
      for (let c = 0; c < words.length; c++) {
        if (b !== a) {
          let wordsAreEqual = (words[a] + words[b]) === (words[c]);
          let wordsAreNotEmpty = words[a] !== '' && words[b] !== '' && words[c] !== '';

          if (wordsAreEqual && wordsAreNotEmpty) {
            let word = words[a] + '|' + words[b] + '=' + words[c];

            if (result.indexOf(word) < 0) {
              result.push(word);
            }
          }
        }
      }
    }
  }

  console.log(result.length === 0 ? 'No' : result.join('\n'));
}

solve(['java..?|basics/*-+=javabasics']);
