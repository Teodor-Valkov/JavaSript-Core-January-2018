function solve (input) {
  let silver = 0;
  let gold = 0;
  let diamonds = 0;

  for (let line of input) {
    let tokens = line.split(' - ');
    let isValidMine = tokens[0].trim().split(' ')[0] === 'mine';

    if (tokens.length === 2) {
      if (isValidMine) {
        let resources = tokens[1].split(':');

        if (resources.length === 2) {
          let type = resources[0].trim().toLowerCase();
          let quantity = Number(resources[1].trim());

          switch (type) {
            case 'gold':
              gold += quantity;
              break;
            case 'silver':
              silver += quantity;
              break;
            case 'diamonds':
              diamonds += quantity;
              break;
          }
        }
      }
    }
  }

  console.log(`*Silver: ${silver}`);
  console.log(`*Gold: ${gold}`);
  console.log(`*Diamonds: ${diamonds}`);
}

solve(['    mine mina - golD : 5',
  'mine mina: gold: 5']);
