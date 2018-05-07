// let SubscriptionCard = require('../02. SubscriptionCard');

class SubscriptionCard {
  constructor(firstName, lastName, SSN) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._SSN = SSN;
    this._subscriptions = [];
    this._blocked = false;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get SSN() {
    return this._SSN;
  }

  get isBlocked() {
    return this._blocked;
  }

  addSubscription(line, startDate, endDate) {
    this._subscriptions.push({
      line,
      startDate,
      endDate
    });
  }

  isValid(line, date) {
    if (this.isBlocked) return false;
    return this._subscriptions.filter(s => s.line === line || s.line === '*')
      .filter(s => {
        return s.startDate <= date &&
          s.endDate >= date;
      }).length > 0;
  }

  block() {
    this._blocked = true;
  }

  unblock() {
    this._blocked = false;
  }
}

let assert = require('chai').assert;

describe('Subscription Card Tests', function () {
  let subscriptionCard;
  beforeEach('initialize class', function () {
    subscriptionCard = new SubscriptionCard('firstName', 'lastName', '0123456789');
  });

  describe('constructor', function () {
    it('should contain all functions', function () {
      assert.equal(SubscriptionCard.prototype.hasOwnProperty('constructor'), true);
      assert.equal(typeof subscriptionCard.constructor, 'function');

      let firstName = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(subscriptionCard), 'firstName');
      assert.isTrue(firstName.hasOwnProperty('get'));
      assert.equal(typeof firstName.get, 'function');

      let lastName = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(subscriptionCard), 'lastName');
      assert.isTrue(lastName.hasOwnProperty('get'));
      assert.equal(typeof lastName.get, 'function');

      let ssn = Object.getOwnPropertyDescriptor(SubscriptionCard.prototype, 'SSN');
      assert.isTrue(ssn.hasOwnProperty('get'));
      assert.equal(typeof ssn.get, 'function');

      let isBlocked = Object.getOwnPropertyDescriptor(SubscriptionCard.prototype, 'isBlocked');
      assert.isTrue(isBlocked.hasOwnProperty('get'));
      assert.equal(typeof isBlocked.get, 'function');
    });

    it('should take 3 parameters', function () {
      assert.equal(SubscriptionCard.length, 3);
    });

    it('instance should be of the same class', function () {
      assert.isTrue(subscriptionCard instanceof SubscriptionCard);
    });

    it('instance should have default values', function () {
      assert.equal(subscriptionCard.firstName, 'firstName');
      assert.equal(subscriptionCard.lastName, 'lastName');
      assert.equal(subscriptionCard.SSN, '0123456789');
      assert.equal(subscriptionCard.isBlocked, false);
    });
  });

  describe('Accsessor "firstName"', function () {
    it('get firstName correctly', function () {
      assert.equal(subscriptionCard.firstName, 'firstName');
    });
    it('cannot set firstName', function () {
      subscriptionCard.firstName = 'firstName changed';
      assert.equal(subscriptionCard.firstName, 'firstName');
    });
  });

  describe('Accsessor "lastName"', function () {
    it('get lastName correctly', function () {
      assert.equal(subscriptionCard.lastName, 'lastName');
    });
    it('cannot set lastName', function () {
      subscriptionCard.lastName = 'lastName changed';
      assert.equal(subscriptionCard.lastName, 'lastName');
    });
  });

  describe('Accsessor "SSN"', function () {
    it('get SSN correctly', function () {
      assert.equal(subscriptionCard.SSN, '0123456789');
    });
    it('cannot set SSN', function () {
      subscriptionCard.SSN = '0123456789 changed';
      assert.equal(subscriptionCard.SSN, '0123456789');
    });
  });

  describe('Accsessor "isBlocked"', function () {
    it('get isBlocked correctly', function () {
      assert.equal(subscriptionCard.isBlocked, false);
    });
    it('cannot set isBlocked', function () {
      subscriptionCard.isBlocked = true;
      assert.equal(subscriptionCard.isBlocked, false);
    });
  });

  describe('Block', function () {
    it('blocks subscription card correctly', function () {
      assert.equal(subscriptionCard.isBlocked, false);
      subscriptionCard.block();
      assert.equal(subscriptionCard.isBlocked, true);
    });
    it('unblocks subscription card correctly', function () {
      subscriptionCard.block();
      assert.equal(subscriptionCard.isBlocked, true);
      subscriptionCard.unblock();
      assert.equal(subscriptionCard.isBlocked, false);
    });

    describe('Add Subscription', function () {
      it('add subscription correctly', function () {
        subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        subscriptionCard.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
      });
    });

    describe('Is Blocked', function () {
      it('blocked card returns false', function () {
        assert.equal(subscriptionCard.isBlocked, false);
        subscriptionCard.block();
        assert.equal(subscriptionCard.isBlocked, true);
        subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        subscriptionCard.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
        assert.equal(subscriptionCard.isValid('120', new Date('2018-04-22')), false);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-05-25')), false);
      });
      it('valid card with no subscriptions returns false', function () {
        assert.equal(subscriptionCard.isValid('120', new Date('2018-04-22')), false);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-05-25')), false);
      });
      it('valid card with wrong start date subscriptions returns false', function () {
        subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        subscriptionCard.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
        assert.equal(subscriptionCard.isValid('120', new Date('2018-04-21')), false);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-05-24')), false);
      });
      it('valid card with wrong end date subscriptions returns false', function () {
        subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        subscriptionCard.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
        assert.equal(subscriptionCard.isValid('120', new Date('2018-05-22')), false);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-06-25')), false);
      });
      it('valid card with correct subscriptions returns true', function () {
        subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        subscriptionCard.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
        assert.equal(subscriptionCard.isValid('120', new Date('2018-04-22')), true);
        assert.equal(subscriptionCard.isValid('120', new Date('2018-05-05')), true);
        assert.equal(subscriptionCard.isValid('120', new Date('2018-05-21')), true);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-05-25')), true);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-06-06')), true);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-06-24')), true);
      });
    });
  });
});