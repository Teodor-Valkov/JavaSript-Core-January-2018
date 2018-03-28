function solve (input) {
  let encryptedText = input[0];
  let magicNumber = Number(input[1]);
  let matrix = [];

  input.shift();
  input.shift();

  for (let i = 0; i < input.length; i++) {
    matrix.push(input[i].split(' ').map(Number));
  }

  let key;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      for (let innerRow = 0; innerRow < matrix.length; innerRow++) {
        for (let innerCol = 0; innerCol < matrix[innerRow].length; innerCol++) {
          if (matrix[row][col] + matrix[innerRow][innerCol] === magicNumber && (row !== innerRow || col !== innerCol)) {
            key = row + col + innerRow + innerCol;
          }
        }
      }
    }
  }

  let decryptedText = '';

  for (let index in encryptedText) {
    let asciiNumber = encryptedText[index].charCodeAt(0);

    if (index % 2 === 0) {
      asciiNumber += key;
    } else {
      asciiNumber -= key;
    }

    decryptedText += String.fromCharCode(asciiNumber);
  }

  console.log(decryptedText);
}

solve(['Vi`ujr!sihtudts',
  '0',
  '0 0 120 300',
  '100 9 300 100',
  '1 290 370 100',
  '10 11 100 550']);
