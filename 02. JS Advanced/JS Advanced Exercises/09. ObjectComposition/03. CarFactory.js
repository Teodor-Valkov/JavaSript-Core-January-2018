function solve (carParts) {
  let engine = {};

  if (carParts.power <= 90) {
    engine = { power: 90, volume: 1800 };
  } else if (carParts.power <= 120) {
    engine = { power: 120, volume: 2400 };
  } else if (carParts.power <= 200) {
    engine = { power: 200, volume: 3500 };
  }

  let carriage = {};

  if (carParts.carriage === 'hatchback') {
    carriage = { type: 'hatchback', color: carParts.color };
  } else if (carParts.carriage === 'coupe') {
    carriage = { type: 'coupe', color: carParts.color };
  }

  if (carParts.wheelsize % 2 === 0) {
    carParts.wheelsize--;
  }

  return {
    model: carParts.model,
    engine: engine,
    carriage: carriage,
    wheels: [carParts.wheelsize, carParts.wheelsize, carParts.wheelsize, carParts.wheelsize]
  };
}

console.log(solve({
  model: 'VW Golf II',
  power: 90,
  color: 'blue',
  carriage: 'hatchback',
  wheelsize: 14
}));
