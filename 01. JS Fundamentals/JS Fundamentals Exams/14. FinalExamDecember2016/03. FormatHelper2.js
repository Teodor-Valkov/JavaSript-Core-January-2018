function solve (input) {
  let text = input[0];

  // Replacing symbols with intervals
  //
  text = text.replace(/([.,!?:;])\s*/g, (match, group) => `${group} `);
  text = text.replace(/\s+([.,!?:;])/g, (match, group) => `${group}`);

  // Replacing triple dots
  //
  text = text.replace(/\.\s+\.\s+\.\s+/g, match => '...');

  // Replacing quotes
  //
  text = text.replace(/"\s*([^"]+?)\s*"/g, (match, group) => `"${group}"`);

  // First way of replacing dates
  //
  text = text.replace(/([0-9]+)\s+\./g, (match, group) => `${group}.`);
  text = text.replace(/\.\s+([0-9]+)/g, (match, group) => `.${group}`);

  // Second way of replacing dates
  //
  text = text.replace(/\.\s+(?=[0-9]+)/g, match => '.');

  console.log(text);
}

solve(['Now let\'s test           , absolutely everything!Aposiopesis is this: ...Have! you read the constraints?, you squidward? It would be pretty sad if this also fails "         !It would be bad if you don\'t put space after the explanation at start,aposiopesis all the way...". Now; 8   . 1 3. 0x041       .   I hope this will be trimmed too     !']);
