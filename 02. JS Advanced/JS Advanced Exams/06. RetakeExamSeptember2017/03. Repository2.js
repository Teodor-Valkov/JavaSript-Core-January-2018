class Repository {
  constructor (properties) {
    this.properties = properties;
    this.data = new Map();

    let id = 0;
    this.getId = function () {
      return id++;
    };
  }

  validate (entity) {
    for (let repositoryKey in this.properties) {
      if (!entity.hasOwnProperty(repositoryKey)) {
        throw new Error(`Property ${repositoryKey} is missing from the entity!`);
      }
    }

    for (let repositoryKey in this.properties) {
      let repositoryValue = this.properties[repositoryKey];
      let entityValue = typeof entity[repositoryKey];

      if (repositoryValue !== entityValue) {
        throw new TypeError(`Property ${repositoryKey} is not of correct type!`);
      }
    }
  }

  add (entity) {
    this.validate(entity);
    let id = this.getId();
    this.data.set(id, entity);
    return id;
  }

  get (id) {
    if (!this.data.has(id)) {
      throw new Error(`Entity with id: ${id} does not exist!`);
    }

    return this.data.get(id);
  }

  update (id, entity) {
    this.get(id);
    this.validate(entity);
    this.data.set(id, entity);
  }

  del (id) {
    this.get(id);
    this.data.delete(id);
  }

  get count () {
    return this.data.size;
  }
}

// Initialize props object
let properties = {
  name: 'string',
  age: 'number',
  birthday: 'object'
};
// Initialize the repository
let repository = new Repository(properties);
// Add two entities
let entity = {
  name: 'Kiril',
  age: 19,
  birthday: new Date(1998, 0, 7)
};
repository.add(entity); // Returns 0
repository.add(entity); // Returns 1
console.log(repository.get(0));
// {"name":"Kiril","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
console.log(repository.get(1));
// {"name":"Kiril","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
// Update an entity
entity = {
  name: 'Valio',
  age: 19,
  birthday: new Date(1998, 0, 7)
};
repository.update(1, entity);
console.log(repository.get(1));
// {"name":"Valio","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
// Delete an entity
repository.del(0);
console.log(repository.count); // Returns 1
let anotherEntity = {
  name1: 'Nakov',
  age: 26,
  birthday: new Date(1991, 0, 21)
};
repository.add(anotherEntity); // should throw an Error
anotherEntity = {
  name: 'Nakov',
  age: 26,
  birthday: 1991
};
repository.add(anotherEntity); // should throw a TypeError
repository.del(-1); // should throw Error for invalid id
