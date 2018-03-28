function solve (input) {
  let totalBitcoins = 0;
  let firstBitcoin = 0;
  let levas = 0;

  let oneBitcoinInLeva = 11949.16;
  let oneGramInLeva = 67.51;

  let golds = input.map(Number);

  for (let i = 1; i <= golds.length; i++) {
    let gold = golds[i - 1];

    if (i % 3 === 0) {
      gold *= 0.7;
    }

    levas += gold * oneGramInLeva;

    if (levas >= oneBitcoinInLeva) {
      if (firstBitcoin === 0) {
        firstBitcoin = i;
      }

      let bitcoins = Math.floor(levas / oneBitcoinInLeva);

      totalBitcoins += bitcoins;
      levas -= bitcoins * oneBitcoinInLeva;
    }
  }

  console.log(`Bought bitcoins: ${totalBitcoins}`);

  if (firstBitcoin !== 0) {
    console.log(`Day of the first purchased bitcoin: ${firstBitcoin}`);
  }

  console.log(`Left money: ${levas.toFixed(2)} lv.`);
}

solve(['100', '200', '300']);
// solve(['50', '100']);
// solve(['3124.15', '504.212', '2511.124']);
