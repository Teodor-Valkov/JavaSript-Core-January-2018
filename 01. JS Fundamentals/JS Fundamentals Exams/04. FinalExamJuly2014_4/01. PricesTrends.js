function solve (input) {
  let prices = input.map(Number);

  console.log('<table>');
  console.log('<tr><th>Price</th><th>Trend</th></tr>');

  let previousPrice = null;

  for (let i = 0; i < prices.length; i++) {
    let price = prices[i].toFixed(2);

    let trend = null;

    if (previousPrice == null || price === previousPrice) {
      trend = 'fixed.png';
    } else if (price < previousPrice) {
      trend = 'down.png';
    } else {
      trend = 'up.png';
    }

    console.log('<tr><td>' + price + '</td><td><img src="' + trend + '"/></td></td>');

    previousPrice = price;
  }

  console.log('</table>');
}

solve(['1',
  '1.00',
  '1.02',
  '1.03',
  '1.04',
  '1.01',
  '1.00',
  '1.0',
  '1',
  '11',
  '22',
  '33',
  '0',
  '0.0',
  '2.0',
  '2.10',
  '2.0',
  '1.99',
  '1.999',
  '1.99001',
  '1.99002',
  '1.99003',
  '4.00',
  '5.00',
  '342.33']);
