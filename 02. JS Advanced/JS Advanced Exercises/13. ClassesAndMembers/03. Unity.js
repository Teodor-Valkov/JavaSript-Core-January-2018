class Rat {
  constructor (name) {
    this.name = name;
    this.unitedRats = [];
  }

  unite (otherRat) {
    if (otherRat instanceof Rat) {
      this.unitedRats.push(otherRat);
    }
  }

  getRats () {
    return this.unitedRats;
  }

  toString () {
    let result = `${this.name}`;

    for (let rat of this.unitedRats) {
      result += `\n##${rat.name}`;
    }

    return result;
  }
}

let rat = new Rat('First');
console.log(rat.toString());
console.log(rat.getRats());

rat.unite(new Rat('Second'));
rat.unite(new Rat('Third'));
console.log(rat.getRats());
console.log(rat.toString());
