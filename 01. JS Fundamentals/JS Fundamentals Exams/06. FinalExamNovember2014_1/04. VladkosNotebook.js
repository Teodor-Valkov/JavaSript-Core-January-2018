function solve (input) {
  let notebook = {};

  for (let line of input) {
    let tokens = line.split('|');

    if (tokens.length !== 3) {
      continue;
    }

    let color = tokens[0];
    let ageOrNameProperty = tokens[1];
    let ageOrNameValue = tokens[2];

    if (!notebook[color]) {
      notebook[color] = {
        wins: 0,
        losses: 0,
        opponents: []
      };
    }

    switch (ageOrNameProperty) {
      case 'name':
        notebook[color][ageOrNameProperty] = ageOrNameValue;
        break;
      case 'age':
        notebook[color][ageOrNameProperty] = ageOrNameValue;
        break;
      case 'win':
        notebook[color]['wins']++;
        notebook[color]['opponents'].push(ageOrNameValue);
        break;
      case 'loss':
        notebook[color]['losses']++;
        notebook[color]['opponents'].push(ageOrNameValue);
        break;
    }
  }

  let colors = Object.keys(notebook);

  for (let color of colors) {
    notebook[color]['opponents'] = notebook[color]['opponents'].sort();
  }

  let results = {};

  let sortedColors = colors.sort();

  for (let color of sortedColors) {
    if (notebook[color]['age'] !== undefined && notebook[color]['name'] !== undefined) {
      results[color] = {
        age: notebook[color]['age'],
        name: notebook[color]['name'],
        opponents: notebook[color]['opponents'],
        rank: ((notebook[color]['wins'] + 1) / (notebook[color]['losses'] + 1)).toFixed(2)
      };
    }
  }

  console.log(JSON.stringify(results));
}

solve(['Sky Blue|name|yasen',
  'Sky Blue|age|21',
  'Sky Blue|win|yasen',
  'Sky Blue|loss|pesho Dobrev',
  'Sky Blue|loss|ivan Ivanov',
  'Sky Blue|win|ivan Ivanov',
  'Sky Blue|win|ivan Ivanov',
  'Sky Blue|win|ivan Ivanov',
  'Dark Blue|age|2',
  'Dark Blue|name|ceco',
  'Dark Blue|win|ico',
  'Dark Blue|loss|mitko',
  'Dark Blue|loss|gosho']);
