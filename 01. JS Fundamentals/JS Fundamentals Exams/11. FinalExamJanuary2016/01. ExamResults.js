function solve (input) {
  let result = '';

  let targetCourseCount = 0;
  let targetCourseGrades = 0;
  let targetCourse = input.pop().trim();

  for (let i = 0; i < input.length; i++) {
    let tokens = input[i].split(/\s+/).filter(token => token !== '');
    let student = tokens[0];
    let course = tokens[1];
    let score = Number(tokens[2]);
    let bonus = Number(tokens[3]);

    if (course === targetCourse) {
      targetCourseCount++;
      targetCourseGrades += score;
    }

    if (score < 100) {
      result += `${student} failed at "${course}"\n`;
      continue;
    }

    let points = score * 0.2 + bonus;
    let grade = ((points / 80) * 4) + 2;

    if (grade > 6.00) {
      grade = 6.00;
    }

    result += `${student}: Exam - "${course}"; Points - ${Number(points.toFixed(2))}; Grade - ${(grade).toFixed(2)}\n`;
  }

  let average = targetCourseGrades / targetCourseCount;
  result += `"${targetCourse}" average points -> ${Number(average.toFixed(2))}`;

  console.log(result);
}

solve(['Pesho C#-Advanced 100 3',
  'Gosho Java-Basics 157 3',
  'Tosho HTML&CSS 317 12',
  'Minka C#-Advanced 57 15',
  'Stanka C#-Advanced 157 15',
  'Kircho C#-Advanced 300 0',
  'Niki C#-Advanced 400 10',
  'C#-Advanced']);
