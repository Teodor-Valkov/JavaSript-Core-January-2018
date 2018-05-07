class Player {
  constructor (nickName) {
    this.nickName = nickName;
    this.scores = [];
  }

  get scoreCount () {
    return this.scores.length;
  }

  get topFiveScore () {
    return this.scores.slice(0, 5);
  }

  get highestScore () {
    if (this.scores.length === 0) {
      return undefined;
    }

    return Math.max.apply(null, this.scores);
  }

  addScore (score) {
    if (!isNaN(score) && score !== null && score !== undefined) {
      this.scores.push(Number(score));
      this.scores.sort((a, b) => b - a);
    }

    return this;
  }

  toString () {
    if (this.scores.length === 0) {
      return `${this.nickName}: []`;
    }

    return `${this.nickName}: [${this.scores}]`;
  }
}

let peter = new Player('Peter');
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);
console.log('Score count: ' + peter.scoreCount);

peter.addScore(null);
peter.addScore(undefined);
peter.addScore(450);
peter.addScore(200);
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);

peter.addScore(2000);
peter.addScore(300);
peter.addScore(50);
peter.addScore(700);
peter.addScore(700);
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);
console.log('Score count: ' + peter.scoreCount);
console.log();

let maria = new Player('Maria').addScore(350).addScore(779).addScore(180);
console.log('Highest score: ' + maria.highestScore);
console.log(`Top 5 score: [${maria.topFiveScore}]`);
console.log('' + maria);
