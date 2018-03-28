function solve (input) {
  let mine = Number(input[0]);
  let days = 0;
  let spices = 0;

  while (mine >= 100) {
    spices += mine;
    spices -= 26;

    mine -= 10;
    days++;
  }

  spices -= 26;

  if (spices < 0) {
    spices = 0;
  }

  console.log(days);
  console.log(spices);
}

solve(['111']);
