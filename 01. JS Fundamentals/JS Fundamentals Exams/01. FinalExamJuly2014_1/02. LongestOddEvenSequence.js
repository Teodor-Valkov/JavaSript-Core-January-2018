function solve (input) {
  let numbers = input[0].split(/[ ()]+/);

  numbers = numbers.filter(n => n !== '');

  let maxLength = 0;
  let currentLength = 0;

  let oddRule = numbers[0] % 2 !== 0;

  for (let i = 0; i < numbers.length; i++) {
    let isOdd = numbers[i] % 2 !== 0;

    if (isOdd === oddRule || numbers[i] === 0) {
      currentLength++;
    } else {
      oddRule = isOdd;
      currentLength = 1;
    }

    oddRule = !oddRule;

    if (currentLength > maxLength) {
      maxLength = currentLength;
    }
  }

  console.log(maxLength);
}

solve(['  ( 2 )  ( 33 ) (1) (4)   (  -1  ) ']);
