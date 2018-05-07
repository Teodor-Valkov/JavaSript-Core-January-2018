class PaymentProcessor {
  constructor (options) {
    this.payments = {};
    this.setOptions(options);
  }

  get types () {
    return this._types;
  }

  set types (value) {
    if (value === undefined) {
      value = ['service', 'product', 'other'];
    }

    this._types = value;
  }

  get precision () {
    return this._precision;
  }

  set precision (value) {
    if (value === undefined) {
      value = 2;
    }

    this._precision = value;
  }

  setOptions (options) {
    this.types = options === undefined ? undefined : options.types;
    this.precision = options === undefined ? undefined : options.precision;
  }

  registerPayment (id, name, type, value) {
    if (id === '' || name === '' || typeof value !== 'number' || !this._types.some(t => t === type) || this.payments.hasOwnProperty(id)) {
      // return;
      throw new Error();
    }

    let payment = {
      name: name,
      type: type,
      value: Number(value.toFixed(this.precision))
    };

    this.payments[id] = payment;
  }

  deletePayment (id) {
    if (!this.payments.hasOwnProperty(id)) {
      // return;
      throw new Error();
    }

    delete this.payments[id];
  }

  get (id) {
    if (!this.payments.hasOwnProperty(id)) {
      // return;
      throw new Error();
    }

    return `Details about payment ID: ${id}
    - Name: ${this.payments[id].name}
    - Type: ${this.payments[id].type}
    - Value: ${this.payments[id].value}`;
  }

  toString () {
    return `Summary:
    - Payments: ${Object.keys(this.payments).length}
    - Balance: ${Object.values(this.payments).map(payment => payment.value).reduce((a, b) => a + b)}`;
  }
}

// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

// Should throw an error (invalid type)
generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);

generalPayments.setOptions({
  types: ['product', 'material']
});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

// Should throw an error (ID not found)
generalPayments.deletePayment('E027');
// Should throw an error (ID not found)
generalPayments.get('E027');

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({
  types: ['service']
});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({
  precision: 5
});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
