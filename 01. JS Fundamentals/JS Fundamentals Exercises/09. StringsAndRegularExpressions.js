// Task 1 - Split String With Delimiter
//
function splitStringWithDelimiter (text, delimiter) {
  let result = text.split(delimiter);

  console.log(result.join('\n'));
}

splitStringWithDelimiter('http://platform.softuni.bg', '.');

// Task 2 - Reapeat String N Times
//
function reapeatStringNTimes (text, number) {
  let result = text.repeat(number);

  console.log(result);
}

reapeatStringNTimes('magic is real', 3);

// Task 3 - Check If String Starts With Given Substring
//
function checkIfStringStartsWithGivenSubstring (text, substring) {
  let result = text.startsWith(substring);

  console.log(result);
}

checkIfStringStartsWithGivenSubstring('Marketing Fundamentals, starting 19/10/2016', 'Marketing Fundamentals, sta');

// Task 4 - Check If String Ends With Given Substring
//
function checkIfStringEndsWithGivenSubstring (text, substring) {
  let result = text.endsWith(substring);

  console.log(result);
}

checkIfStringEndsWithGivenSubstring('The new iPhone has no headphones jack.', 'o headphones jack.');

// Task 5 - Capitalize Words
//
function capitalizeWords (input) {
  let words = input.split(' ').map(word => word.toLowerCase());
  let result = [];

  for (let word of words) {
    result.push(word[0].toUpperCase() + word.substring(1));
  }

  console.log(result.join(' '));
}

capitalizeWords('Was that Easy? tRY thIs onE for SiZe!');

// Task 6 - Capture Numbers
//
function captureNumbers (input) {
  let regex = /\d+/g;
  let result = [];

  for (let line of input) {
    let match = regex.exec(line);

    while (match) {
      result.push(match);

      match = regex.exec(line);
    }
  }

  console.log(result.join(' '));
}

captureNumbers(['The300',
  'What is that?',
  'I think it’s the 3rd movie.',
  'Lets watch it at 22:45']);

// Task 6 - Capture Numbers
//
function captureNumbers2 (input) {
  let regex = /\d+/g;
  let text = input.join(' ');
  let matches = text.match(regex);

  console.log(matches.join(' '));
}

captureNumbers2(['The300',
  'What is that?',
  'I think it’s the 3rd movie.',
  'Lets watch it at 22:45']);

// Task 7 - Find Variable Names in Sentences
//
function findVariableNamesInSentences (input) {
  let regex = /\b_([A-Za-z0-9]+)\b/g;
  let result = [];

  let match = regex.exec(input);

  while (match) {
    result.push(match[1]);

    match = regex.exec(input);
  }

  console.log(result.join(','));
}

findVariableNamesInSentences('Calculate the _area of the _perfectRectangle object.');

// Task 7 - Find Variable Names in Sentences
//
function findVariableNamesInSentences2 (input) {
  let regex = /\b_([A-Za-z0-9]+)\b/g;
  let matches = input.match(regex).map(word => word.substring(1));

  console.log(matches.join(','));
}

findVariableNamesInSentences2('Calculate the _area of the _perfectRectangle object.');

// Task 8 - Find Occurrences of Word in Sentence
//
function findOccurrencesOfWordInSentence (sentence, word) {
  let regex = new RegExp(`\\b${word}\\b`, 'gi');
  let match = regex.exec(sentence);
  let count = 0;

  while (match) {
    count++;
    match = regex.exec(sentence);
  }

  console.log(count);
}

findOccurrencesOfWordInSentence('The waterfall was so high, that the child couldn’t see its peak.', 'the');

// Task 8 - Find Occurrences of Word in Sentence
//
function findOccurrencesOfWordInSentence2 (sentence, word) {
  let regex = new RegExp(`\\b${word}\\b`, 'gi');
  let matches = sentence.match(regex);

  console.log(matches === null ? 0 : matches.length);
}

findOccurrencesOfWordInSentence2('The waterfall was so high, that the child couldn’t see its peak.', 'the');

// Task 9 - Extract Links
//
function extractLinks (input) {
  let regex = /(www)\.([A-Za-z0-9-]+)\.([A-Za-z.]+[A-Za-z]+)/g;
  let result = [];

  for (let line of input) {
    if (regex.test(line)) {
      let matches = line.match(regex);

      for (let match of matches) {
        result.push(match);
      }
    }
  }

  console.log(result.join('\n'));
}

extractLinks(['Need information about cheap hotels in London?',
  'You can check us at www.london-hotels.co.uk!',
  'We provide the best services in London.',
  'Here are some reviews in some blogs:',
  '"London Hotels are awesome!" - www.indigo.bloggers.com',
  '"I am very satisfied with their services" - ww.ivan.bg',
  '"Best Hotel Services!" - www.rebel21.sedecrem.moc']);

// Task 9 - Extract Links
//
function extractLinks2 (input) {
  let regex = /(www)\.([A-Za-z0-9-]+)\.([A-Za-z.]+[A-Za-z]+)/g;
  let result = [];

  for (let line of input) {
    let match = regex.exec(line);

    while (match) {
      result.push(match[0]);

      match = regex.exec(line);
    }
  }

  console.log(result.join('\n'));
}

extractLinks2(['Need information about cheap hotels in London?',
  'You can check us at www.london-hotels.co.uk!',
  'We provide the best services in London.',
  'Here are some reviews in some blogs:',
  '"London Hotels are awesome!" - www.indigo.bloggers.com',
  '"I am very satisfied with their services" - ww.ivan.bg',
  '"Best Hotel Services!" - www.rebel21.sedecrem.moc']);

// Task 10 - Secret Data
//
function secretData (input) {
  let regexUsername = /(\*[A-Z][A-Za-z]*)(?= |\t|$)/gm;
  let regexPhone = /(\+[0-9-]{10})(?= |\t|$)/gm;
  let regexId = /(![A-Za-z0-9]+)(?= |\t|$)/gm;
  let regexSecretBase = /(_[A-Za-z0-9]+)(?= |\t|$)/gm;

  let text = input.join('\n');

  text = text.replace(regexUsername, match => '|'.repeat(match.length));
  text = text.replace(regexPhone, match => '|'.repeat(match.length));
  text = text.replace(regexId, match => '|'.repeat(match.length));
  text = text.replace(regexSecretBase, match => '|'.repeat(match.length));

  console.log(text);
}

secretData(['Agent *Ivankov was in the room when it all happened.',
  'The person in the room was heavily armed.',
  'Agent *Ivankov had to act quick in order.',
  'He picked up his phone and called some unknown number. ',
  'I think it was +555-49-796',
  'I can\'t really remember...',
  'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
  'Then after that he disappeared from my sight.',
  'As if he vanished in the shadows.',
  'A moment, shorter than a second, later, I saw the person flying off the top floor.',
  'I really don\'t know what happened there.',
  'This is all I saw, that night.',
  'I cannot explain it myself...']);

// Task 10 - Secret Data
//
function secretData2 (input) {
  let regexUsername = /(\*[A-Z][A-Za-z]*)(?= |\t|$)/g;
  let regexPhone = /(\+[0-9-]{10})(?= |\t|$)/g;
  let regexId = /(![A-Za-z0-9]+)(?= |\t|$)/g;
  let regexSecretBase = /(_[A-Za-z0-9]+)(?= |\t|$)/g;

  for (let line of input) {
    line = line.replace(regexUsername, match => '|'.repeat(match.length));
    line = line.replace(regexPhone, match => '|'.repeat(match.length));
    line = line.replace(regexId, match => '|'.repeat(match.length));
    line = line.replace(regexSecretBase, match => '|'.repeat(match.length));

    console.log(line);
  }
}

secretData2(['Agent *Ivankov was in the room when it all happened.',
  'The person in the room was heavily armed.',
  'Agent *Ivankov had to act quick in order.',
  'He picked up his phone and called some unknown number. ',
  'I think it was +555-49-796',
  'I can\'t really remember...',
  'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
  'Then after that he disappeared from my sight.',
  'As if he vanished in the shadows.',
  'A moment, shorter than a second, later, I saw the person flying off the top floor.',
  'I really don\'t know what happened there.',
  'This is all I saw, that night.',
  'I cannot explain it myself...']);
