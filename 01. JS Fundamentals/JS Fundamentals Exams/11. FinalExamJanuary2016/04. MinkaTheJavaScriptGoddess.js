function solve (input) {
  let results = {};

  for (let line of input) {
    let tokens = line.trim().split(/\s+&\s+/g);
    let taskName = tokens[0];
    let taskType = tokens[1];
    let taskNumber = `Task ${tokens[2]}`;
    let taskScore = Number(tokens[3]);
    let taskLines = Number(tokens[4]);

    if (!results[taskNumber]) {
      results[taskNumber] = {
        tasks: [],
        average: 0,
        lines: 0
      };
    }

    let task = {
      name: taskName,
      type: taskType
    };

    results[taskNumber]['tasks'].push(task);
    results[taskNumber]['average'] += Number(taskScore);
    results[taskNumber]['lines'] += Number(taskLines);
  }

  let taskNumbers = Object.keys(results);

  for (let taskNumber of taskNumbers) {
    results[taskNumber]['tasks'].sort((a, b) => a['name'].localeCompare(b['name']));
    results[taskNumber]['average'] = Number((results[taskNumber]['average'] / results[taskNumber]['tasks'].length).toFixed(2));
  }

  let taskNumbersSorted = taskNumbers.sort((a, b) => {
    if (results[a]['average'] === results[b]['average']) {
      return results[a]['lines'] - results[b]['lines'];
    }

    return results[b]['average'] - results[a]['average'];
  });

  let sortedObject = {};

  for (let taskNumber of taskNumbersSorted) {
    sortedObject[taskNumber] = results[taskNumber];
  }

  console.log(JSON.stringify(sortedObject));
}

solve(['Array Matcher & strings & 4 & 100 & 38',
  'Magic Wand & draw & 3 & 100 & 15',
  'Dream Item & loops & 2 & 88 & 80',
  'Knight Path & bits & 5 & 100 & 65',
  'Basket Battle & conditionals & 2 & 100 & 120',
  'Torrent Pirate & calculations & 1 & 100 & 20',
  'Encrypted Matrix & nested loops & 4 & 90 & 52',
  'Game of bits & bits & 5 &  100 & 18',
  'Fit box in box & conditionals & 1 & 100 & 95',
  'Disk & draw & 3 & 90 & 15',
  'Poker Straight & nested loops & 4 & 40 & 57',
  'Friend Bits & bits & 5 & 100 & 81']);
