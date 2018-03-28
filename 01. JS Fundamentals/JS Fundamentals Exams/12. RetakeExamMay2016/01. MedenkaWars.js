function solve (input) {
  let whiteDamage = 0;
  let darkDamage = 0;
  let whiteAttacks = [];
  let darkAttacks = [];

  for (let line of input) {
    let tokens = line.split(' ').filter(token => token !== '');

    if (tokens.length !== 3) {
      continue;
    }

    let damage = Number(tokens[0]);
    let player = tokens[1];

    if (player === 'white') {
      let whiteLength = whiteAttacks.length;

      if (whiteLength >= 1) {
        if (damage === whiteAttacks[whiteLength - 1]) {
          damage *= 2.75;
        }
      }

      whiteDamage += damage * 60;
      whiteAttacks.push(damage);
    } else if (player === 'dark') {
      let darkLength = darkAttacks.length;

      if (darkLength >= 4) {
        if (damage === darkAttacks[darkLength - 1] && damage === darkAttacks[darkLength - 2] && damage === darkAttacks[darkLength - 3] && damage === darkAttacks[darkLength - 4]) {
          damage *= 4.5;
        }
      }

      darkDamage += damage * 60;
      darkAttacks.push(damage);
    }
  }

  console.log(whiteDamage > darkDamage ? `Winner - Vitkor` : `Winner - Naskor`);
  console.log(whiteDamage > darkDamage ? `Damage - ${whiteDamage}` : `Damage - ${darkDamage}`);
}

solve(['2 dark medenkas',
  '1 white medenkas',
  '2 dark medenkas',
  '2 dark medenkas',
  '15 white medenkas',
  '2 dark medenkas',
  '2 dark medenkas']);
