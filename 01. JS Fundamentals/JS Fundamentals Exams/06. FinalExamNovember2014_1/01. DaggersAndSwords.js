function solve (input) {
  let blades = input.map(Number);

  console.log('<table border="1">');
  console.log('<thead>');
  console.log('<tr><th colspan="3">Blades</th></tr>');
  console.log('<tr><th>Length [cm]</th><th>Type</th><th>Application</th></tr>');
  console.log('</thead>');
  console.log('<tbody>');

  for (let i = 0; i < blades.length; i++) {
    blades[i] = Math.floor(blades[i]);
  }

  for (let i = 0; i < blades.length; i++) {
    let bladeLength = blades[i];

    if (bladeLength > 10) {
      let application = '';

      switch (remainderAfterDivision(bladeLength)) {
        case 1:
          application = 'blade';
          break;
        case 2:
          application = 'quite a blade';
          break;
        case 3:
          application = 'pants-scraper';
          break;
        case 4:
          application = 'frog-butcher';
          break;
        case 0:
          application = '*rap-poker';
          break;
        default:
          application = 'ERROR';
      }

      let type = '';

      if (bladeLength > 40) {
        type = 'sword';
      } else {
        type = 'dagger';
      }

      console.log('<tr><td>' + bladeLength + '</td><td>' + type + '</td><td>' + application + '</td></tr>');
    }
  }

  console.log('</tbody>');
  console.log('</table>');

  function remainderAfterDivision (bladeLength) {
    let remainder = bladeLength % 5;

    return remainder;
  }
}

solve(['17.8', '19.4', '13', '55.8', '126.96541651', '3']);
