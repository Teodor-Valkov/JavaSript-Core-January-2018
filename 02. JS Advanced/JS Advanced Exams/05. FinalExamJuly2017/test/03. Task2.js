class Task {
  constructor (title, deadline) {
    this.title = title;
    this.deadline = deadline;
    this.status = 'Open';
  }

  get deadline () {
    return this._deadline;
  }

  set deadline (value) {
    if (value < Date.now()) {
      throw new Error('Deadline cannot be in the past.');
    }

    this._deadline = value;
  }

  get isOverdue () {
    if (this.status === 'Complete') {
      return false;
    }

    return this.deadline < Date.now();
  }

  static comparator (a, b) {
    // let comparator = {
    //   'In Progress': 1,
    //   'Open': 2,
    //   'Complete': 3
    // };

    if (Task.statusRank === undefined) {
      Object.defineProperty(Task, 'statusRank', {
        value: {
          'In Progress': 1,
          'Open': 2,
          'Complete': 3
        },
        configurable: false,
        enumerable: false,
        writable: false
      });
    }

    let rankA = a.isOverdue ? 0 : Task.statusRank[a.status];
    let rankB = b.isOverdue ? 0 : Task.statusRank[b.status];

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    return a.deadline - b.deadline;
  }

  toString () {
    let statuses = {
      'Open': '\u2731',
      'In Progress': '\u219D',
      'Complete': '\u2714',
      'Overdue': '\u26A0'
    };

    if (this.status === 'Complete') {
      return `[${statuses[this.status]}] ${this.title}`;
    }

    if (this.isOverdue) {
      return `[${statuses['Overdue']}] ${this.title} (overdue)`;
    }

    return `[${statuses[this.status]}] ${this.title} (deadline: ${this.deadline})]`;
  }
}

let expect = require('chai').expect;
let sinon = require('sinon');

let date1 = new Date();
let date2 = new Date();
let date3 = new Date();
let date4 = new Date();
let date5 = new Date();
let date6 = new Date();
let date7 = new Date();
let date8 = new Date();
date1.setDate(105);
date2.setDate(110);
date3.setDate(115);
date4.setDate(120);
date5.setDate(125);
date6.setDate(130);
date7.setDate(135);
date8.setDate(140);
let task1 = new Task('Task1', date1);
let task2 = new Task('Task2', date2);
let task3 = new Task('Task3', date3);
let task4 = new Task('Task4', date4);
let task5 = new Task('Task5', date5);
let task6 = new Task('Task6', date6);
let task7 = new Task('Task7', date7);
let task8 = new Task('Task8', date8);

task1.status = 'Complete';
task3.status = 'In Progress';
task6.status = 'In Progress';
task7.status = 'In Progress';
task8.status = 'Complete';

let tasklist = [
  task4, task5, task7, task6, task3, task2, task8, task1
];

describe('sumNums()', function () {
  it('TEST', function () {
    let targetDate = new Date();
    targetDate.setDate(117);
    let clock = sinon.useFakeTimers(targetDate.getTime());

    expect(Task.hasOwnProperty('comparator'), 'Comparator is missing or non-static').to.be.true;
    expect(typeof Task.comparator).to.equal('function', 'Comparator is incorrectly defined');
    expect(Task.comparator.length).to.equal(2, 'Comparator must take two parameters');
    expect(() => tasklist.sort(Task.comparator), 'Comparator worked incorrectly').to.not.throw;

    tasklist.sort(Task.comparator);

    expect(tasklist[0].title).to.equal(task2.title, 'Incorrect order 0');
    expect(tasklist[1].title).to.equal(task3.title, 'Incorrect order 1');
    expect(tasklist[2].title).to.equal(task6.title, 'Incorrect order 2');
    expect(tasklist[3].title).to.equal(task7.title, 'Incorrect order 3');
    expect(tasklist[4].title).to.equal(task4.title, 'Incorrect order 4');
    expect(tasklist[5].title).to.equal(task5.title, 'Incorrect order 5');
    expect(tasklist[6].title).to.equal(task1.title, 'Incorrect order 6');
    expect(tasklist[7].title).to.equal(task8.title, 'Incorrect order 7');

    clock.restore();
  });
});
