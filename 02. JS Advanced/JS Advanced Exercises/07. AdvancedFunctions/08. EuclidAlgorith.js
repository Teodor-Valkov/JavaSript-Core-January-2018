function solve (a, b) {
  if (Math.min(a, b) === 0) {
    return Math.max(a, b);
  }

  return solve(b, a % b);
}

console.log(solve(252, 105));
