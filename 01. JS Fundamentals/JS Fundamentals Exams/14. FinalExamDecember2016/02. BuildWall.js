function solve (input) {
  let miles = input.map(Number);
  let yards = [];

  while (true) {
    if (miles.every(m => m === 30)) {
      break;
    }

    let currentYards = 0;

    for (let i = 0; i < miles.length; i++) {
      if (miles[i] < 30) {
        miles[i]++;
        currentYards += 195;
      }
    }

    yards.push(currentYards);
  }

  let pesos = yards.reduce((a, b) => a + b) * 1900;

  console.log(yards.join(', '));
  console.log(`${pesos} pesos`);
}

solve(['21', '25', '28']);
