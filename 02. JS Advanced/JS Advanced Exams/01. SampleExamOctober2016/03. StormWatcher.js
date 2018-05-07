let Record = (function () {
  let id = 0;

  class Record {
    constructor (temperature, humidity, pressure, windSpeed) {
      this.id = id++;
      // this.id = Record.getId();
      this.temperature = temperature;
      this.humidity = humidity;
      this.pressure = pressure;
      this.windSpeed = windSpeed;
    }

    // static getId () {
    //  if (this.id === undefined) {
    //    this.id = 0;
    //  }
    //
    //  return this.id++;
    // }

    toString () {
      let weather = 'Not stormy';

      if (this.temperature < 20 && (this.pressure < 700 || this.pressure > 900) && this.windSpeed > 25) {
        weather = 'Stormy';
      }

      let result = '';

      result += `Reading ID: ${this.id}\n`;
      result += `Temperature: ${this.temperature}*C\n`;
      result += `Relative Humidity: ${this.humidity}%\n`;
      result += `Pressure: ${this.pressure}hpa\n`;
      result += `Wind Speed: ${this.windSpeed}m/s\n`;
      result += `Weather: ${weather}`;

      return result;
    }
  }

  return Record;
})();

let record1 = new Record(32, 66, 760, 12);
console.log(record1.toString());

let record2 = new Record(10, 40, 680, 30);
console.log(record2.toString());
