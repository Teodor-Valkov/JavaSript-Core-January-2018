function isSymmetric (input) {
  if (!Array.isArray(input)) {
    return false;
  }

  let reversed = input.slice(0).reverse();
  let areEqual = (JSON.stringify(input) === JSON.stringify(reversed));

  return areEqual;
}

module.exports = { isSymmetric };
