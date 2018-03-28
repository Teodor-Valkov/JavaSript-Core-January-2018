function solve (input) {
  let text = input[0];
  let numbers = text
    .split(/\D+/g)
    .filter(n => n !== '')
    // .filter(Boolean)
    .map(Number);

  for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    let hex = number.toString(16);
    let leadingZeros = 4 - hex.length;
    let upper = new Array(leadingZeros + 1).join('0') + hex;

    numbers[i] = '0x' + upper.toUpperCase();
  }

  console.log(numbers.join('-'));
}

solve(['5tffwj(//*7837xzc2---34rlxXP%$".']);
