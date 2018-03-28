let solve = (function () {
  return {
    add: (firstVector, secondVector) => [firstVector[0] + secondVector[0], firstVector[1] + secondVector[1]],
    multiply: (vector, scalar) => [vector[0] * scalar, vector[1] * scalar],
    length: (vector) => Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2)),
    dot: (firstVector, secondVector) => firstVector[0] * secondVector[0] + firstVector[1] * secondVector[1],
    cross: (firstVector, secondVector) => firstVector[0] * secondVector[1] - firstVector[1] * secondVector[0]
  };
})();

solve['add']([1, 1], [1, 0]);
solve['multiply']([3.5, -2], 2);
solve['length']([3, -4]);
solve['dot']([1, 0], [0, -1]);
solve['cross']([3, 7], [1, 0]);
