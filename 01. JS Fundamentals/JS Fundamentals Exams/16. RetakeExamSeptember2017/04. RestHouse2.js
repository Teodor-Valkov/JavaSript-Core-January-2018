function solve (inputRooms, inputPeople) {
  let rooms = new Map();
  let guests = 0;

  for (let line of inputRooms) {
    let number = line['number'];
    let type = line['type'];
    let freeBeds = type === 'double-bedded' ? 2 : 3;

    rooms.set(number, {
      type: type,
      status: 'free',
      freeBeds: freeBeds,
      people: []
    });
  }

  for (let line of inputPeople) {
    let firstPerson = line['first'];
    let secondPerson = line['second'];

    if ((firstPerson['gender'] !== secondPerson['gender'])) {
      let occupiedDoubleRoom = 0;

      for (let [number, room] of rooms) {
        if (room['type'] === 'double-bedded' && room['status'] === 'free') {
          room['status'] = 'occupied';
          room['freeBeds'] = 0;
          occupiedDoubleRoom = number;
          break;
        }
      }

      if (occupiedDoubleRoom !== 0) {
        rooms.get(occupiedDoubleRoom)['people'].push(firstPerson);
        rooms.get(occupiedDoubleRoom)['people'].push(secondPerson);
      } else {
        guests += 2;
      }
    } else if (firstPerson['gender'] === secondPerson['gender']) {
      let gender = firstPerson['gender'];

      for (let i = 0; i < 2; i++) {
        let person = i === 0 ? firstPerson : secondPerson;
        let occupiedTripleRoom = 0;

        for (let [number, room] of rooms) {
          if (room['type'] === 'triple' && room['status'] === 'free') {
            room['status'] = gender;
            room['freeBeds']--;
            occupiedTripleRoom = number;
            break;
          } else if (room['type'] === 'triple' && room['status'] === gender && room['freeBeds'] > 0) {
            room['freeBeds']--;
            occupiedTripleRoom = number;
            break;
          }
        }

        if (occupiedTripleRoom !== 0) {
          rooms.get(occupiedTripleRoom)['people'].push(person);
        } else {
          guests++;
        }
      }
    }
  }

  let sortedRooms = Array.from(rooms).sort();

  for (let [number, room] of sortedRooms) {
    console.log(`Room number: ${number}`);

    let sortedPeople = room['people'].sort((a, b) => a['name'].localeCompare(b['name']));

    for (let person of sortedPeople) {
      console.log(`--Guest Name: ${person['name']}`);
      console.log(`--Guest Age: ${person['age']}`);
    }

    let freeBeds = rooms.get(number)['freeBeds'];
    console.log(`Empty beds in the room: ${freeBeds}`);
  }

  console.log(`Guests moved to the tea house: ${guests}`);
}

solve([ { number: '206', type: 'double-bedded' },
  { number: '311', type: 'triple' } ],
[ { first: { name: 'Tanya Popova', gender: 'female', age: 24 },
  second: { name: 'Miglena Yovcheva', gender: 'female', age: 23 } },
{ first: { name: 'Katerina Stefanova', gender: 'female', age: 23 },
  second: { name: 'Angel Nachev', gender: 'male', age: 22 } },
{ first: { name: 'Tatyana Germanova', gender: 'female', age: 23 },
  second: { name: 'Boryana Baeva', gender: 'female', age: 22 } } ]);

// solve([ { number: '101A', type: 'double-bedded' },
//   { number: '104', type: 'triple' },
//   { number: '101B', type: 'double-bedded' },
//   { number: '102', type: 'triple' } ],
// [ { first: { name: 'Sushi & Chicken', gender: 'female', age: 15 },
//   second: { name: 'Salisa Debelisa', gender: 'female', age: 25 } },
// { first: { name: 'Daenerys Targaryen', gender: 'female', age: 20 },
//   second: { name: 'Jeko Snejev', gender: 'male', age: 18 } },
// { first: { name: 'Pesho Goshov', gender: 'male', age: 20 },
//   second: { name: 'Gosho Peshov', gender: 'male', age: 18 } },
// { first: { name: 'Conor McGregor', gender: 'male', age: 29 },
//   second: { name: 'Floyd Mayweather', gender: 'male', age: 40 } } ]);
