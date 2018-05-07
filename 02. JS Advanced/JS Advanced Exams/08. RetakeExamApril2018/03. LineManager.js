class LineManager {
  constructor(stops) {
    this.stops = stops;
    this.currentStop = this.stops[0];
    this.nextStopIndex = 1;
    this.stopsCovered = 0;
    this.duration = 0;
    this.delay = 0;
  }

  get stops() {
    return this._stops;
  }

  set stops(value) {
    for (let stop of value) {
      if (Number.isNaN(stop.timeToNext) || !stop.name) {
        throw new Error('Invalid name.')
      }

      if (stop.timeToNext < 0) {
        throw new Error('Invalid minutes.')
      }
    }

    this._stops = value;
  }

  get atDepot() {
    return this.nextStopIndex >= this.stops.length;
  }

  get nextStopName() {
    if (this.atDepot) {
      return 'At depot.'
    }

    return this.stops[this.nextStopIndex].name;
  }

  get currentDelay() {
    return this.delay;
  }

  arriveAtStop(minutes) {
    if (Number.isNaN(minutes) || minutes <= 0) {
      throw new Error('Invalid minutes.')
    }

    if (this.atDepot) {
      throw new Error('The bus is at depot.')
    }

    this.duration += minutes;
    this.delay += minutes - this.currentStop.timeToNext;

    this.currentStop = this.stops[this.nextStopIndex];
    this.nextStopIndex++;
    this.stopsCovered++;

    if (this.currentStop.name === this.stops[this.stops.length - 1].name) {
      return false;
    }

    return true;
  }

  toString() {
    let result = 'Line summary\n';

    if (this.atDepot) {
      result += `- Next stop: Course completed\n`;
    } else {
      result += `- Next stop: ${this.nextStopName}\n`;
    }
    
    result += `- Stops covered: ${this.stopsCovered}\n`;
    result += `- Time on course: ${this.duration} minutes\n`;
    result += `- Delay: ${this.currentDelay} minutes`;

    return result;
  }
}

// Initialize a line manager with correct values
const man = new LineManager([
  {name: 'Depot', timeToNext: 4},
  {name: 'Romanian Embassy', timeToNext: 2},
  {name: 'TV Tower', timeToNext: 3},
  {name: 'Interpred', timeToNext: 4},
  {name: 'Dianabad', timeToNext: 2},
  {name: 'Depot', timeToNext: 0},
]);

// Travel through all the stops until the bus is at depot
while (man.atDepot === false) {
  console.log(man.toString());
  man.arriveAtStop(3);
}

console.log(man.toString());

// Should throw an Error (minutes cannot be negative)
// man.arriveAtStop(-4);
// Should throw an Error (last stop reached)
// man.arriveAtStop(4);

// Should throw an Error at initialization
// const wrong = new LineManager([{
//   name: 'Stop',
//   timeToNext: {
//     wrong: 'Should be a number'
//   }
// }]);