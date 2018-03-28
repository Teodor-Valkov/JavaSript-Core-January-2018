function solve (input) {
  let words = input[0].split(/[\s,.:!?]+/g)
    // .filter(Boolean)
    .filter(word => word !== '')
    .map(word => word.toLowerCase());

  let wordsCount = [];

  for (let word of words) {
    if (wordsCount[word] === undefined) {
      wordsCount[word] = 0;
    }

    wordsCount[word]++;
  }

  let repeatedWords = [];

  for (let word in wordsCount) {
    if (wordsCount[word] >= 3) {
      repeatedWords.push(word);
    }
  }

  if (repeatedWords.length === 0) {
    console.log('No words');
    return;
  }

  let regex = /(.)+?(\.|\?|!)/g;
  let sentences = input[1].match(regex).map(sentence => sentence.trim());

  let hasSentences = false;

  for (let sentence of sentences) {
    let wordsInSentence = sentence.split(/[\s,.:!?]+/g).map(word => word.toLowerCase());

    let wordsCount = 0;

    for (let repeatedWord of repeatedWords) {
      for (let wordInSentece of wordsInSentence) {
        if (repeatedWord === wordInSentece) {
          wordsCount++;
          break;
        }
      }
    }

    if (wordsCount >= 2) {
      console.log(sentence);
      hasSentences = true;
    }
  }

  if (!hasSentences) {
    console.log('No sentences');
  }
}

solve(['Captain Obvious was walking down the street. As the captain was walking a person came and told him: You are Captain Obvious! He replied: Thank you CAPTAIN OBVIOUS you are the man!',
  'The captain was walking and he was obvious. He did not know what was going to happen to you in the future. Was he curious? We do not know.']);
