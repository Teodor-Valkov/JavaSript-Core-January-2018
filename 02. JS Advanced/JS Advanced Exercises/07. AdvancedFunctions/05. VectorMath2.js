let solve = (function () {
  let add = function (firstVector, secondVector) {
    return [firstVector[0] + secondVector[0], firstVector[1] + secondVector[1]];
  };

  let multiply = function (vector, scalar) {
    return [vector[0] * scalar, vector[1] * scalar];
  };

  function length (vector) {
    return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
  }

  function dot (firstVector, secondVector) {
    return firstVector[0] * secondVector[0] + firstVector[1] * secondVector[1];
  }

  function cross (firstVector, secondVector) {
    return firstVector[0] * secondVector[1] - firstVector[1] * secondVector[0];
  }

  return {
    add,
    multiply,
    length,
    dot,
    cross
  };
})();

solve['add']([1, 1], [1, 0]);
solve['multiply']([3.5, -2], 2);
solve['length']([3, -4]);
solve['dot']([1, 0], [0, -1]);
solve['cross']([3, 7], [1, 0]);
