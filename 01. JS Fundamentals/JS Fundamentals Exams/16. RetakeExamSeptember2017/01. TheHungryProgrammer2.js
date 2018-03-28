function solve (meals, input) {
  let mealsEaten = 0;

  for (let line of input) {
    let tokens = line.split(' ');
    let command = tokens[0];
    let meal = '';

    if (command === 'End') {
      break;
    }

    switch (command) {
      case 'Serve':
        if (tokens.length === 1 && meals.length !== 0) {
          meal = meals.pop();
          console.log(`${meal} served!`);
        }
        break;
      case 'Add':
        if (tokens.length === 2) {
          meal = tokens[1];
          meals.unshift(meal);
        }
        break;
      case 'Shift':
        if (tokens.length === 3) {
          let firstIndex = Number(tokens[1]);
          let secondIndex = Number(tokens[2]);

          if (firstIndex >= 0 && firstIndex < meals.length && secondIndex >= 0 && secondIndex < meals.length && firstIndex !== secondIndex) {
            let temp = meals[firstIndex];
            meals[firstIndex] = meals[secondIndex];
            meals[secondIndex] = temp;
          }
        }
        break;
      case 'Eat':
        if (tokens.length === 1 && meals.length !== 0) {
          meal = meals.shift();
          mealsEaten++;

          console.log(`${meal} eaten`);
        }
        break;
      case 'Consume':
        if (tokens.length === 3) {
          let startIndex = Number(tokens[1]);
          let endIndex = Number(tokens[2]);

          if (startIndex >= 0 && startIndex < meals.length && endIndex >= 0 && endIndex < meals.length && startIndex < endIndex) {
            let length = endIndex - startIndex + 1;

            meals.splice(startIndex, length);
            mealsEaten += length;

            console.log('Burp!');
          }
        }
        break;
      default:
        break;
    }
  }

  console.log(meals.length === 0 ? 'The food is gone' : `Meals left: ${meals.join(', ')}`);
  console.log(`Meals eaten: ${mealsEaten}`);
}

solve(['chicken', 'steak', 'eggs'],
  ['Serve',
    'Eat',
    'End',
    'Consume 0 1']);

// solve(['fries', 'fish', 'beer', 'chicken', 'beer', 'eggs'],
//   ['Add spaghetti',
//     'Shift 0 1',
//     'Consume 1 4',
//     'End']);

// solve(['carrots', 'apple', 'beet'],
//   ['Consume 0 2',
//     'End' ]);
