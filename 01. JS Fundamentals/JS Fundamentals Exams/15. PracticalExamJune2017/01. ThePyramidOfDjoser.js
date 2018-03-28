function solve (size, increment) {
  let stone = 0;
  let marble = 0;
  let lapis = 0;
  let gold = 0;
  let height = 0;

  let count = 0;
  let stoneModifier = 0;
  let marbleAndLapisModifier = 0;

  while (size !== 1 && size !== 2) {
    count++;

    stoneModifier = (size - 2) * (size - 2);
    marbleAndLapisModifier = size * 4 - 4;

    stone += stoneModifier * increment;

    if (count % 5 === 0) {
      lapis += marbleAndLapisModifier * increment;
    } else {
      marble += marbleAndLapisModifier * increment;
    }

    size -= 2;
  }

  count++;
  gold += size * size * increment;
  height += count * increment;

  console.log(`Stone required: ${Math.ceil(stone)}`);
  console.log(`Marble required: ${Math.ceil(marble)}`);
  console.log(`Lapis Lazuli required: ${Math.ceil(lapis)}`);
  console.log(`Gold required: ${Math.ceil(gold)}`);
  console.log(`Final pyramid height: ${Math.floor(height)}`);
}

solve(12, 1);
