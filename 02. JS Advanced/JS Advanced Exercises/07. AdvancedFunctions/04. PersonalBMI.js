function solve (name, age, weight, height) {
  let BMI = Math.round(weight / Math.pow((height / 100), 2));
  let status = '';

  switch (true) {
    case BMI < 18.5: status = 'underweight'; break;
    case BMI < 25: status = 'normal'; break;
    case BMI < 30: status = 'overweight'; break;
    case BMI >= 30: status = 'obese'; break;
  }

  let person = {
    name: name,
    personalInfo: {
      age: age,
      weight: weight,
      height: height
    },
    BMI: BMI,
    status: status
  };

  if (person['status'] === 'obese') {
    person['recommendation'] = 'admission required';
  }

  return person;
}

let a = solve('Peter', 29, 75, 182);
console.log(a);
