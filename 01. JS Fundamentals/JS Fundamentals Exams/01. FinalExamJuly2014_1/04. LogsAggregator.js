function solve (input) {
  let number = Number(input[0]);
  let users = {};

  for (let i = 1; i <= number; i++) {
    let tokens = input[i].split(' ');
    let ip = tokens[0];
    let username = tokens[1];
    let minute = Number(tokens[2]);

    if (!users[username]) {
      users[username] = {};
      users[username][ip] = minute;
    } else if (users[username] && !users[username][ip]) {
      users[username][ip] = minute;
    } else {
      users[username][ip] += minute;
    }
  }

  let usernames = Object.keys(users);
  let usernamesSorted = usernames.sort();

  let result = '';

  for (let username of usernamesSorted) {
    let allMinutes = Object.values(users[username]).reduce((a, b) => a + b);
    let ips = Object.keys(users[username]);
    let ipsSorted = ips.sort();

    result += username + ': ' + allMinutes + ' [' + ipsSorted.join(', ') + ']\n';
  }

  console.log(result);
}

solve(['14',
  '8.8.8.8 google 100',
  '8.8.8.8 google 50',
  '10.10.10.10 test 98',
  '10.10.10.10 google 730',
  '8.8.8.8 google 150',
  '10.10.10.10 test 100',
  '8.8.8.8 google 50',
  '10.10.10.10 root 46',
  '10.10.10.10 root 58',
  '8.8.8.8 root 167',
  '1.2.3.4 root 120',
  '5.6.7.8 root 970',
  '192.168.0.11 root 55',
  '10.10.10.10 test 302']);
