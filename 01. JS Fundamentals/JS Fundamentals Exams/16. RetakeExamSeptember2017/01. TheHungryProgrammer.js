function solve (meals, input) {
  let mealsEaten = 0;

  let instructions = {
    Serve: (tokens) => {
      if (tokens.length === 1 && meals.length !== 0) {
        let meal = meals.pop();
        console.log(`${meal} served!`);
      }
    },
    Add: (tokens) => {
      if (tokens.length === 2) {
        let meal = tokens[1];
        meals.unshift(meal);
      }
    },
    Shift: (tokens) => {
      if (tokens.length === 3) {
        let firstIndex = Number(tokens[1]);
        let secondIndex = Number(tokens[2]);

        if (firstIndex >= 0 && firstIndex < meals.length && secondIndex >= 0 && secondIndex < meals.length && firstIndex !== secondIndex) {
          let temp = meals[firstIndex];
          meals[firstIndex] = meals[secondIndex];
          meals[secondIndex] = temp;
        }
      }
    },
    Eat: (tokens) => {
      if (tokens.length === 1 && meals.length !== 0) {
        let meal = meals.shift();
        mealsEaten++;

        console.log(`${meal} eaten`);
      }
    },
    Consume: (tokens) => {
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
    },
    End: (tokens) => {
      console.log(meals.length === 0 ? 'The food is gone' : `Meals left: ${meals.join(', ')}`);
      console.log(`Meals eaten: ${mealsEaten}`);
    }
  };

  for (let line of input) {
    let tokens = line.split(' ');
    let command = tokens[0];

    if (instructions[command] !== undefined) {
      instructions[command](tokens);
    }

    if (command === 'End') {
      break;
    }
  }
}

solve(['bacon', 'veggies', 'chicken', 'turkey', 'eggs'],
  ['Shift 2 9',
    'Eat',
    'Serve',
    'End',
    'Serve']);

// solve(['chicken', 'steak', 'eggs'],
//   ['Serve',
//     'Eat',
//     'End',
//     'Consume 0 1']);

// solve(['fries', 'fish', 'beer', 'chicken', 'beer', 'eggs'],
//   ['Add spaghetti',
//     'Shift 0 1',
//     'Consume 1 4',
//     'End']);

// solve(['carrots', 'apple', 'beet'],
//   ['Consume 0 2',
//     'End' ]);
