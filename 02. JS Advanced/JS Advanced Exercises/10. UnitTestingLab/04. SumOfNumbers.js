function sum (numbers) {
  let result = 0;

  for (let number of numbers) {
    result += Number(number);
  }

  return result;
}

module.exports = { sum };
