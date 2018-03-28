function solve (numbers, order) {
  let ascending = (a, b) => a - b;
  let descending = (a, b) => b - a;

  let strategies = {
    asc: ascending,
    desc: descending
  };

  return numbers.sort(strategies[order]);
}

solve([14, 7, 17, 6, 8], 'desc');
