function solve () {
  class Device {
    constructor (manufacturer) {
      if (new.target === Device) {
        throw new Error('Abstract Class cannont be instantiated directly.');
      }

      this.manufacturer = manufacturer;
    }
  }

  class Keyboard extends Device {
    constructor (manufacturer, responseTime) {
      super(manufacturer);
      this.responseTime = Number(responseTime);
    }
  }

  class Monitor extends Device {
    constructor (manufacturer, width, height) {
      super(manufacturer);
      this.width = Number(width);
      this.height = Number(height);
    }
  }

  class Battery extends Device {
    constructor (manufacturer, expectedLife) {
      super(manufacturer);
      this.expectedLife = Number(expectedLife);
    }
  }

  class Computer extends Device {
    constructor (manufacturer, processorSpeed, ram, hardDiskSpace) {
      super(manufacturer);

      if (new.target === Computer) {
        throw new Error('Abstract Class cannont be instantiated directly.');
      }

      this.processorSpeed = Number(processorSpeed);
      this.ram = Number(ram);
      this.hardDiskSpace = Number(hardDiskSpace);
    }
  }

  class Laptop extends Computer {
    constructor (manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace);
      this.weight = weight;
      this.color = color;
      this.battery = battery;
    }

    get battery () {
      return this._battery;
    }
    set battery (value) {
      if (!(value instanceof Battery)) {
        throw new TypeError('battery should be of type Battery.');
      }

      this._battery = value;
    }
  }

  class Desktop extends Computer {
    constructor (manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace);
      this.keyboard = keyboard;
      this.monitor = monitor;
    }

    get keyboard () {
      return this._keyboard;
    }
    set keyboard (value) {
      if (!(value instanceof Keyboard)) {
        throw new TypeError('keyboard should be of type Keyboard.');
      }

      this._keyboard = value;
    }

    get monitor () {
      return this._monitor;
    }
    set monitor (value) {
      if (!(value instanceof Monitor)) {
        throw new TypeError('monitor should be of type Monitor.');
      }

      this._monitor = value;
    }
  }
  
  return { Battery, Keyboard, Monitor, Computer, Laptop, Desktop };
}
