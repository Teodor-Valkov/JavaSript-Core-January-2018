function solve () {
  class Employee {
    constructor (name, age) {
      if (new.target === Employee) {
        throw new Error('Cannot make instance of the abstract class Employee.');
      }

      this.name = name;
      this.age = age;
      this.salary = 0;
      this.tasks = [];
    }

    work () {
      let currentTask = this.tasks.shift();
      console.log(`${this.name} ${currentTask}`);
      this.tasks.push(currentTask);
    }

    getSalary () {
      return this.salary;
    }

    collectSalary () {
      console.log(`${this.name} received ${this.getSalary()} this month.`);
    }
  }

  class Junior extends Employee {
    constructor (name, age) {
      super(name, age);
      this.tasks.push('is working on a simple task.');
    }
  }

  class Senior extends Employee {
    constructor (name, age) {
      super(name, age);
      this.tasks.push('is working on a complicated task.');
      this.tasks.push('is taking time off work.');
      this.tasks.push('is supervising junior workers.');
    }
  }

  class Manager extends Employee {
    constructor (name, age) {
      super(name, age);
      this.dividend = 0;
      this.tasks.push('scheduled a meeting.');
      this.tasks.push('is preparing a quarterly report.');
    }

    getSalary () {
      return super.getSalary() + this.dividend;
    }
  }

  return { Employee, Junior, Senior, Manager };
}

let result = solve();

console.log(`===================`);
let first = new result.Senior('First', 25);
first.salary = 1000;
first.work();
first.work();
first.work();
first.collectSalary();

console.log(`===================`);
let second = new result.Manager('Second', 35);
second.salary = 1500;
second.dividend = 500;
second.collectSalary();
second.work();
second.work();
second.work();
