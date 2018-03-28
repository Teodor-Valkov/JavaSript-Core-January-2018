class Entity {
  constructor (name) {
    if (new.target === Entity) {
      throw new Error('Cannot make instances of the abstract class Entity.');
    }

    this.name = name;
  }
}

module.exports = Entity;
