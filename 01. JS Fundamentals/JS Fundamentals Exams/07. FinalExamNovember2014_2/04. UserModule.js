function solve (input) {
  let sortingTokens = input[0].split('^');
  let studentSortingCriteria = sortingTokens[0];

  input.shift();

  let resultsSorted = {
    students: [],
    trainers: []
  };

  for (let line of input) {
    let studentOrTrainer = JSON.parse(line);
    let role = studentOrTrainer['role'];

    switch (role) {
      case 'student':
        resultsSorted['students'].push(studentOrTrainer);
        break;
      case 'trainer':
        resultsSorted['trainers'].push(studentOrTrainer);
        break;
    }
  }

  switch (studentSortingCriteria) {
    case 'level':
      resultsSorted['students'] = resultsSorted['students'].sort((a, b) => a['level'] - b['level'] || a['id'] - b['id']);
      break;
    case 'name':
      resultsSorted['students'] = resultsSorted['students'].sort((a, b) => a['firstname'].localeCompare(b['firstname']) || a['lastname'].localeCompare(b['lastname']));
      break;
  }

  resultsSorted['trainers'] = resultsSorted['trainers'].sort((a, b) => a['courses'].length - b['courses'].length || a['lecturesPerDay'] - b['lecturesPerDay']);

  let results = {
    students: [],
    trainers: []
  };

  for (let studentObject of resultsSorted['students']) {
    let student = {};

    student['id'] = studentObject['id'];
    student['firstname'] = studentObject['firstname'];
    student['lastname'] = studentObject['lastname'];
    student['averageGrade'] = (studentObject['grades'].map(Number).reduce((a, b) => a + b) / studentObject['grades'].length).toFixed(2);
    student['certificate'] = studentObject['certificate'];

    results['students'].push(student);
  }

  for (let trainerObject of resultsSorted['trainers']) {
    let trainer = {};

    trainer['id'] = trainerObject['id'];
    trainer['firstname'] = trainerObject['firstname'];
    trainer['lastname'] = trainerObject['lastname'];
    trainer['courses'] = trainerObject['courses'];
    trainer['lecturesPerDay'] = trainerObject['lecturesPerDay'];

    results['trainers'].push(trainer);
  }

  console.log(JSON.stringify(results));
}

solve(['level^courses',
  '{"id":0,"firstname":"Angel","lastname":"Ivanov","town":"Plovdiv","role":"student","grades":["5.89"],"level":2,"certificate":false}',
  '{"id":1,"firstname":"Mitko","lastname":"Nakova","town":"Dimitrovgrad","role":"trainer","courses":["PHP","Unity Basics"],"lecturesPerDay":6}',
  '{"id":2,"firstname":"Bobi","lastname":"Georgiev","town":"Varna","role":"student","grades":["5.59","3.50","4.54","5.05","3.45"],"level":4,"certificate":false}',
  '{"id":3,"firstname":"Ivan","lastname":"Ivanova","town":"Vidin","role":"trainer","courses":["JS","Java","JS OOP","Database","OOP","C#"],"lecturesPerDay":7}',
  '{"id":4,"firstname":"Mitko","lastname":"Petrova","town":"Sofia","role":"trainer","courses":["Database","JS Apps","Java"],"lecturesPerDay":2}']);
