function solve (input) {
  let coins = 0;

  for (let i = 0; i < input.length; i++) {
    let tokens = input[i].split(' ');
    let type = tokens[0].toLowerCase();
    let value = tokens[1];

    if (type === 'coin' && value > 0 && isInt(value)) {
      coins += Number(value);
    }
  }

  let goldCoins = parseInt(coins / 100);
  coins %= 100;

  let silverCoins = parseInt(coins / 10);
  coins %= 10;

  let bronzeCoins = coins;

  console.log('gold : ' + goldCoins);
  console.log('silver : ' + silverCoins);
  console.log('bronze : ' + bronzeCoins);

  function isInt (number) {
    return number % 1 === 0;
  }
}

solve(['coin 1', 'coin two', 'coin 5', 'coin 10.50', 'coin 20', 'coin 50', 'coin hundred', 'cigars 1']);
