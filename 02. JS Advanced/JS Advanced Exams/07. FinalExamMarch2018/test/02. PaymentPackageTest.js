// let PaymentPackage = require('../02. PaymentPackage');

class PaymentPackage {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.VAT = 20;
    this.active = true;
  }

  get name() {
    return this._name;
  }

  set name(newValue) {
    if (typeof newValue !== 'string') {
      throw new Error('Name must be a non-empty string');
    }
    if (newValue.length === 0) {
      throw new Error('Name must be a non-empty string');
    }
    this._name = newValue;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (typeof newValue !== 'number') {
      throw new Error('Value must be a non-negative number');
    }
    if (newValue < 0) {
      throw new Error('Value must be a non-negative number');
    }
    this._value = newValue;
  }

  get VAT() {
    return this._VAT;
  }

  set VAT(newValue) {
    if (typeof newValue !== 'number') {
      throw new Error('VAT must be a non-negative number');
    }
    if (newValue < 0) {
      throw new Error('VAT must be a non-negative number');
    }
    this._VAT = newValue;
  }

  get active() {
    return this._active;
  }

  set active(newValue) {
    if (typeof newValue !== 'boolean') {
      throw new Error('Active status must be a boolean');
    }
    this._active = newValue;
  }

  toString() {
    const output = [
      `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
      `- Value (excl. VAT): ${this.value}`,
      `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
    ];
    return output.join('\n');
  }
}

let assert = require('chai').assert;

describe('Payment Package Tests', function () {
  let paymentPackage;
  beforeEach('initialize class', function () {
    paymentPackage = new PaymentPackage('payment', 20);
  });

  describe('constructor', function () {
    it('should contain all properties', function () {
      assert.isTrue(paymentPackage.hasOwnProperty('_name'));
      assert.isTrue(paymentPackage.hasOwnProperty('_value'));
      assert.isTrue(paymentPackage.hasOwnProperty('_VAT'));
      assert.isTrue(paymentPackage.hasOwnProperty('_active'));
    });

    it('should contain all functions', function () {
      assert.equal(PaymentPackage.prototype.hasOwnProperty('constructor'), true);
      assert.equal(typeof paymentPackage.constructor, 'function');

      let name = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'name');
      assert.isTrue(name.hasOwnProperty('get'));
      assert.isTrue(name.hasOwnProperty('set'));
      assert.equal(typeof name.get, 'function');
      assert.equal(typeof name.set, 'function');

      let value = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'value');
      assert.isTrue(value.hasOwnProperty('get'));
      assert.isTrue(value.hasOwnProperty('set'));
      assert.equal(typeof value.get, 'function');
      assert.equal(typeof value.set, 'function');

      let vat = Object.getOwnPropertyDescriptor(PaymentPackage.prototype, 'VAT');
      assert.isTrue(vat.hasOwnProperty('get'));
      assert.isTrue(vat.hasOwnProperty('set'));
      assert.equal(typeof vat.get, 'function');
      assert.equal(typeof vat.set, 'function');

      let active = Object.getOwnPropertyDescriptor(PaymentPackage.prototype, 'active');
      assert.isTrue(active.hasOwnProperty('get'));
      assert.isTrue(active.hasOwnProperty('set'));
      assert.equal(typeof active.get, 'function');
      assert.equal(typeof active.set, 'function');

      assert.equal(Object.getPrototypeOf(paymentPackage).hasOwnProperty('toString'), true);
      assert.equal(typeof paymentPackage.toString, 'function');
    });

    it('should take 2 parameters', function () {
      assert.equal(PaymentPackage.length, 2);
    });

    it('instance should be of the same class', function () {
      assert.isTrue(paymentPackage instanceof PaymentPackage);
    });

    it('instance should have default values', function () {
      assert.equal(paymentPackage.name, 'payment');
      assert.equal(paymentPackage.value, 20);
      assert.equal(paymentPackage.VAT, 20);
      assert.equal(paymentPackage.active, true);
    });

    it('instance should be valid in the border case with value equal to 0', function () {
      assert.doesNotThrow(() => new PaymentPackage('payment', 0), Error);
    });
  });

  describe('Accsessor "name"', function () {
    it('get name correctly', function () {
      assert.equal(paymentPackage.name, 'payment');
    });
    it('set name correctly', function () {
      paymentPackage.name = 'payment changed';
      assert.equal(paymentPackage.name, 'payment changed');
    });
    it('throw error with non string', function () {
      assert.throws(() => (paymentPackage.name = 20), Error, 'Name must be a non-empty string');
    });
    it('throw error with empty string', function () {
      assert.throws(() => (paymentPackage.name = ''), Error, 'Name must be a non-empty string');
    });
  });

  describe('Accsessor "value"', function () {
    it('get value correctly', function () {
      assert.equal(paymentPackage.value, 20);
    });
    it('set value correctly', function () {
      paymentPackage.value = 50;
      assert.equal(paymentPackage.value, 50);
    });
    it('throw error with non number', function () {
      assert.throws(() => (paymentPackage.value = 'payment'), Error, 'Value must be a non-negative number');
    });
    it('throw error with negative number', function () {
      assert.throws(() => (paymentPackage.value = -20), Error, 'Value must be a non-negative number');
    });
  });

  describe('Accsessor "VAT"', function () {
    it('get VAT correctly', function () {
      assert.equal(paymentPackage.VAT, 20);
    });
    it('set VAT correctly', function () {
      paymentPackage.VAT = 50;
      assert.equal(paymentPackage.VAT, 50);
    });
    it('throw error with non number', function () {
      assert.throws(() => (paymentPackage.VAT = 'payment'), Error, 'VAT must be a non-negative number');
    });
    it('throw error with negative number', function () {
      assert.throws(() => (paymentPackage.VAT = -20), Error, 'VAT must be a non-negative number');
    });
  });

  describe('Accsessor "active"', function () {
    it('get active correctly', function () {
      assert.isTrue(paymentPackage.active);
    });
    it('set active correctly', function () {
      paymentPackage.active = false;
      assert.isFalse(paymentPackage.active);
    });
    it('throw error with non boolean', function () {
      assert.throws(() => (paymentPackage.active = 'payment'), Error, 'Active status must be a boolean');
    });
  });

  describe('Function toString()', function () {
    it('active', function () {
      paymentPackage = new PaymentPackage('payment', 0);
      assert.equal(paymentPackage.toString(), `Package: payment\n- Value (excl. VAT): 0\n- Value (VAT 20%): 0`);
    });
    it('not active', function () {
      paymentPackage = new PaymentPackage('payment', 0);
      paymentPackage.active = false;
      assert.equal(paymentPackage.toString(), `Package: payment (inactive)\n- Value (excl. VAT): 0\n- Value (VAT 20%): 0`);
    });
    it('active', function () {
      assert.equal(paymentPackage.toString(), `Package: payment\n- Value (excl. VAT): 20\n- Value (VAT 20%): 24`);
    });
    it('not active', function () {
      paymentPackage.active = false;
      assert.equal(paymentPackage.toString(), `Package: payment (inactive)\n- Value (excl. VAT): 20\n- Value (VAT 20%): 24`);
    });
  });
});