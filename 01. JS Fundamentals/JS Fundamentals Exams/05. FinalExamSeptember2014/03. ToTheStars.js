function solve (input) {
  let starOne = input[0].split(/\s+/);
  let starTwo = input[1].split(/\s+/);
  let starThree = input[2].split(/\s+/);

  let tokens = input[3].split(/\s+/);

  let normandyX = Number(tokens[0]);
  let normandyY = Number(tokens[1]);
  let turns = Number(input[4]);

  let starNames = [starOne[0], starTwo[0], starThree[0]];
  let starX = [Number(starOne[1]), Number(starTwo[1]), Number(starThree[1])];
  let starY = [Number(starOne[2]), Number(starTwo[2]), Number(starThree[2])];

  for (let i = 0; i <= turns; i++) {
    let foundStar = false;

    for (let j = 0; j < 3; j++) {
      if (isInsideStar(normandyX, normandyY, starX[j], starY[j])) {
        console.log(starNames[j].toLowerCase());
        foundStar = true;
        break;
      }
    }

    if (!foundStar) {
      console.log('space');
    }

    normandyY++;
  }

  function isInsideStar (normandyX, normandyY, starX, starY) {
    return (normandyX <= starX + 1 && normandyX >= starX - 1) && (normandyY <= starY + 1 && normandyY >= starY - 1);
  }
}

solve(['starCobra 7.3 10',
  'starCancer 29.0 4',
  'starPiscuis 15.6 3.3',
  '14.8 1',
  '4']);
