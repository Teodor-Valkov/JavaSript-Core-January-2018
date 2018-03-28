function solve (input) {
  let courses = {};

  for (let i = 0; i < input.length; i++) {
    let tokens = input[i].split('|');

    if (tokens.length !== 4) {
      continue;
    }

    let student = tokens[0].trim();
    let course = tokens[1].trim();
    let grade = Number(tokens[2].trim());
    let visits = Number(tokens[3].trim());

    if (!courses[course]) {
      courses[course] = {
        grades: [],
        visits: [],
        students: []
      };
    }

    courses[course]['grades'].push(grade);
    courses[course]['visits'].push(visits);

    if (courses[course]['students'].indexOf(student) === -1) {
      courses[course]['students'].push(student);
    }
  }

  let results = {};

  let coursesSorted = Object.keys(courses).sort();

  for (let course of coursesSorted) {
    let courseInfo = {
      avgGrade: average(courses[course]['grades']),
      avgVisits: average(courses[course]['visits']),
      students: courses[course]['students'].sort()
    };

    results[course] = courseInfo;
  }

  console.log(JSON.stringify(results));

  function average (object) {
    let sum = 0;

    for (let property in object) {
      sum += object[property];
    }

    let average = sum / object.length;
    average = Number(average.toFixed(2));

    return average;
  }
}

solve(['Peter Nikolov | PHP  | 5.50 | 8',
  'Maria Ivanova | Java | 5.83 | 7',
  'Ivan Petrov   | PHP  | 3.00 | 2',
  'Ivan Petrov   | C#   | 3.00 | 2',
  'Peter Nikolov | C#   | 5.50 | 8',
  'Maria Ivanova | C#   | 5.83 | 7',
  'Ivan Petrov   | C#   | 4.12 | 5',
  'Ivan Petrov   | PHP  | 3.10 | 2',
  'Peter Nikolov | Java | 6.00 | 9']);
