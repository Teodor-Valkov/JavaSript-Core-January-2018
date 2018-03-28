let solve = (function () {
  let sum = 0;

  function add (number) {
    sum += number;

    return add;
  }

  add.toString = () => sum;

  return add;
}());

console.log(solve(1)(6)(-3).toString());
