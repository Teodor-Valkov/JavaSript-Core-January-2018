function solve (input) {
  let miles = input.map(Number);
  let yards = [];
  let totalYards = 0;

  while (miles.some(m => m !== 30)) {
    let currentYards = 0;

    for (let i = 0; i < miles.length; i++) {
      if (miles[i] < 30) {
        miles[i]++;
        currentYards += 195;
      }
    }

    yards.push(currentYards);
    totalYards += currentYards;
  }

  let pesos = totalYards * 1900;

  console.log(yards.join(', '));
  console.log(`${pesos} pesos`);
}

solve(['21', '25', '28']);
