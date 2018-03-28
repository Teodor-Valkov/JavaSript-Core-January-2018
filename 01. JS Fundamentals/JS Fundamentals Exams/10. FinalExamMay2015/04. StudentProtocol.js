function solve (input) {
  let protocol = {};

  for (let line of input) {
    let tokens = line.split(/(?:-|:)+/g).map(token => token.trim());
    let name = tokens[0];
    let exam = tokens[1];
    let score = Number(tokens[2]);

    if (score >= 0 && score <= 400) {
      if (!protocol[exam]) {
        protocol[exam] = [];
        protocol[exam].push({
          name: name,
          result: score,
          makeUpExams: 0
        });
      } else {
        let isStudentExisting = false;

        for (let index in protocol[exam]) {
          if (protocol[exam][index]['name'] === name) {
            protocol[exam][index]['makeUpExams']++;
            isStudentExisting = true;

            if (protocol[exam][index]['result'] < score) {
              protocol[exam][index]['result'] = score;
            }
          }
        }

        if (!isStudentExisting) {
          protocol[exam].push({
            name: name,
            result: score,
            makeUpExams: 0
          });
        }
      }
    }
  }

  for (let exam in protocol) {
    protocol[exam].sort((a, b) => {
      if (a['result'] === b['result']) {
        if (a['makeUpExams'] === b['makeUpExams']) {
          return a['name'].localeCompare(b['name']);
        }

        return a['makeUpExams'] - b['makeUpExams'];
      }

      return b['result'] - a['result'];
    });
  }

  console.log(JSON.stringify(protocol));
}

solve(['Peter Jackson - Java : 350',
  'Jane - JavaScript : 200',
  'Jane     -    JavaScript :     400',
  'Simon Cowell - PHP : 100',
  'Simon Cowell-PHP: 500',
  'Simon Cowell - PHP : 200']);
