function solve (input) {
  let surveyRegex = /<svg>((?:.|\s)+?)<\/svg>/g;
  let catRegex = /<cat><text>(?:.|\s)*?\[([^\]]*?)\](?:.|\s)*?<\/text><\/cat>\s*<cat>(.+)<\/cat>/g;
  let votesRegex = /<g><val>(\d+)<\/val>(\d+)<\/g>/g;

  let surveyMatch = surveyRegex.exec(input);

  if (surveyMatch === null) {
    console.log('No survey found');
    return;
  }

  let secondSurveyMatch = surveyRegex.exec(input);
  if (secondSurveyMatch !== null) {
    console.log('Invalid format');
    return;
  }

  let catMatches = catRegex.exec(surveyMatch[1]);

  if (catMatches === null) {
    console.log('Invalid format');
    return;
  }

  let values = 0;
  let counts = 0;

  let votes = catMatches[2];
  let voteMatch = votesRegex.exec(votes);

  while (voteMatch) {
    let value = Number(voteMatch[1]);
    let count = Number(voteMatch[2]);

    if (value >= 1 && value <= 10 && count >= 0) {
      values += value * count;
      counts += count;
    }

    voteMatch = votesRegex.exec(votes);
  }

  let label = catMatches[1];
  let rating = Number((values / counts).toFixed(2));

  console.log(`${label}: ${rating}`);
}

solve('<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>');
// solve('<svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>');
// solve('<p>How do you suggest we improve our service?</p><p>More tacos.</p><p>It\'s great, don\'t mess with it!</p><p>I\'d like to have the option for delivery</p>');
// solve('<svg><cat><text>Which is your favourite meal from our selection?</text></cat><cat><g><val>Fish</val>15</g><g><val>Prawns</val>31</g><g><val>Crab Langoon</val>12</g><g><val>Calamari</val>17</g></cat></svg>');
