function solve (input) {
  let resultScores = new Map();
  let resultCount = new Map();

  let targetCourse = '';

  for (let line of input) {
    let tokens = line.split(/\s+/g).filter(token => token !== '');

    if (tokens.length === 1) {
      targetCourse = tokens[0];
      break;
    }

    if (tokens.length !== 4) {
      continue;
    }

    let student = tokens[0];
    let course = tokens[1];
    let score = Number(tokens[2]);
    let bonus = Number(tokens[3]);

    if (!resultScores.has(course)) {
      resultScores.set(course, 0);
    }

    resultScores.set(course, resultScores.get(course) + score);

    if (!resultCount.has(course)) {
      resultCount.set(course, 0);
    }

    resultCount.set(course, resultCount.get(course) + 1);

    if (score < 100) {
      console.log(`${student} failed at "${course}"`);
      continue;
    }

    let points = score * 0.2 + bonus;
    let grade = ((points / 80) * 4) + 2;

    if (grade > 6) {
      grade = 6;
    }

    console.log(`${student}: Exam - "${course}"; Points - ${Number(points.toFixed(2))}; Grade - ${grade.toFixed(2)}`);
  }

  let average = resultScores.get(targetCourse) / resultCount.get(targetCourse);
  console.log(`"${targetCourse}" average points -> ${Number(average.toFixed(2))}`);
}

solve(['Pesho C#-Advanced 100 3',
  'Gosho Java-Basics 157 3',
  'Tosho HTML&CSS 317 12',
  'Minka C#-Advanced 57 15',
  'Stanka C#-Advanced 157 15',
  'Kircho C#-Advanced 300 0',
  'Niki C#-Advanced 400 10',
  'C#-Advanced', '']);
