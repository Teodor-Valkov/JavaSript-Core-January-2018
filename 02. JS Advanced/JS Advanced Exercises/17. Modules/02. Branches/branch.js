let Employee = require('./employee');

class Branch {
  constructor (id, branchName, companyName) {
    this.id = id;
    this.branchName = branchName;
    this.companyName = companyName;
    this.listOfEmployees = [];
  }

  get employees () {
    return this.listOfEmployees;
  }

  hire (employee) {
    this.listOfEmployees.push(employee);
  }

  toString () {
    let result = `@ ${this.companyName}, ${this.branchName}, ${this.id}\n` + `Employed:`;

    if (this.employees.length === 0) {
      result += '\nNone...';
    } else {
      for (let employee of this.employees) {
        result += `\n** ${employee.toString()}`;
      }
    }

    return result;
  }
}

module.exports = Branch;
