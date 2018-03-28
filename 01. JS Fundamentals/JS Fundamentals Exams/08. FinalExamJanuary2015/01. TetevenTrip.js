function solve (input) {
  let result = '';

  for (let i = 0; i < input.length; i++) {
    let tokens = input[i].split(' ');

    if (tokens.length !== 4) {
      continue;
    }

    let car = tokens[0];
    let fuel = tokens[1];
    let trace = tokens[2];
    let baggage = Number(tokens[3]);

    let finalConsumption = Math.round(calculateFinalConsumption(trace, fuel, baggage));

    result += `${car} ${fuel} ${trace} ${finalConsumption}` + '\n';
  }

  console.log(result);

  function calculateFinalConsumption (trace, fuelType, baggage) {
    let averageConsumption = getConsumptionByFuel(fuelType) + getOverFuelConsumption(baggage);
    let consumptionInSnow;
    let calculatedConsumption;

    switch (trace) {
      case '1':
        consumptionInSnow = calculateOverConsumptionInSnow(10, averageConsumption);
        calculatedConsumption = consumptionInSnow + (averageConsumption * (110 * 0.01));
        break;
      case '2':
        consumptionInSnow = calculateOverConsumptionInSnow(30, averageConsumption);
        calculatedConsumption = consumptionInSnow + (averageConsumption * (95 * 0.01));
        break;
      default:
        console.log('Invalid input');
        return;
    }

    return calculatedConsumption;
  }

  function getConsumptionByFuel (fuelType) {
    let baseConsumption = 10;

    switch (fuelType) {
      case 'petrol':
        return 1 * baseConsumption;
      case 'diesel':
        return 0.8 * baseConsumption;
      case 'gas':
        return 1.2 * baseConsumption;
      default:
        return console.log('Invaid input');
    }
  }

  function getOverFuelConsumption (baggage) {
    let overFuel = 0.01 * baggage;
    return overFuel;
  }

  function calculateOverConsumptionInSnow (km, averageConsumption) {
    return (0.3 * averageConsumption) * (km * 0.01);
  }
}

solve(['BMW petrol 1 320.5',
  'Golf petrol 2 150.75',
  'Lada gas 1 202',
  'Mercedes diesel 2 312.54']);
