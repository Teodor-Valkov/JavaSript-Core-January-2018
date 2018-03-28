let sharedObject = {
  name: null,
  income: null,
  changeName: function (name) {
    if (name.length === 0) {
      return;
    }

    this.name = name;
    let newName = $('#name');
    newName.val(this.name);
  },
  changeIncome: function (income) {
    if (!Number.isInteger(income) || income <= 0) {
      return;
    }

    this.income = income;
    let newIncome = $('#income');
    newIncome.val(this.income);
  },
  updateName: function () {
    let newName = $('#name').val();

    if (newName.length === 0) {
      return;
    }

    this.name = newName;
  },
  updateIncome: function () {
    let newIncome = $('#income').val();

    if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
      return;
    }

    this.income = Number(newIncome);
  }
};

let assert = require('chai').assert;
let jsdom = require('jsdom-global')();
let $ = require('jquery');

document.body.innerHTML = `<div id="wrapper">
        <input type="text" id="name">
        <input type="text" id="income">
    </div>`;

describe('sharedObject', function () {
  it('check if initial name value is null', function () {
    assert.isNull(sharedObject.name);
  });

  it('check if initial income value is null', function () {
    assert.isNull(sharedObject.income);
  });

  describe('changeName', function () {
    it('changeName should not change the name property if an invalid value is passed', function () {
      sharedObject.changeName('');
      assert.isNull(sharedObject.name);
    });

    it('changeName should not change the name property if an invalid value is passed, with preexisting value', function () {
      sharedObject.name = 'preexisting value';
      sharedObject.changeName('');
      assert.equal(sharedObject.name, 'preexisting value');
    });

    it('changeName should not change the textbox property if an invalid value is passed', function () {
      let initial = $('#name').val();
      sharedObject.changeName('');
      assert.equal(initial, $('#name').val());
    });

    it('changeName should not change the textbox property if an invalid value is passed, with preexisting value', function () {
      $('#name').val('preexisting value');
      sharedObject.changeName('');
      assert($('#name').val(), 'preexisting value');
    });

    it('changeName should change the name property correctly', function () {
      sharedObject.changeName('changed');
      assert.equal(sharedObject.name, 'changed');
    });

    it('changeName should change the textbox property correctly', function () {
      sharedObject.changeName('changed');
      assert.equal($('#name').val(), 'changed');
    });
  });

  describe('changeIncome', function () {
    it('changeIncome should return and not change income property if the entered number is negative', function () {
      sharedObject.income = 20;
      sharedObject.changeIncome(-10);
      assert.equal(sharedObject.income, 20);
    });

    it('changeIncome should return and not change income property if the entered number is zero', function () {
      sharedObject.income = 20;
      sharedObject.changeIncome(0);
      assert.equal(sharedObject.income, 20);
    });

    it('changeIncome should return and not change income property if the entered number is a floating-point number', function () {
      sharedObject.income = 20;
      sharedObject.changeIncome(3.14);
      assert.equal(sharedObject.income, 20);
    });

    it('changeIncome should return and not change income property if the entered number is a string', function () {
      sharedObject.income = 20;
      sharedObject.changeIncome('10');
      assert.equal(sharedObject.income, 20);
    });

    it('changeIncome should return and not change textbox property if the entered number is negative', function () {
      $('#income').val('20');
      sharedObject.changeIncome(-10);
      assert.equal($('#income').val(), '20');
    });

    it('changeIncome should return and not change textbox property if the entered number is zero', function () {
      $('#income').val('20');
      sharedObject.changeIncome(0);
      assert.equal($('#income').val(), '20');
    });

    it('changeIncome should return and not change textbox property if the entered number is a floating-point number', function () {
      $('#income').val('20');
      sharedObject.changeIncome(3.14);
      assert.equal($('#income').val(), '20');
    });

    it('changeIncome should return and not change textbox property if the entered number is a string', function () {
      $('#income').val('20');
      sharedObject.changeIncome('10');
      assert.equal($('#income').val(), '20');
    });

    it('changeIncome should change the income property correctly', function () {
      sharedObject.income = 20;
      sharedObject.changeIncome(10);
      assert.equal(sharedObject.income, 10);
    });

    it('changeIncome should change the textbox property correctly', function () {
      $('#income').val(20);
      sharedObject.changeIncome(10);
      assert.equal($('#income').val(), '10');
    });
  });

  describe('updateName', function () {
    it('updateName should return and not change name property if textbox property is invalid', function () {
      sharedObject.name = 'not changed';
      $('#name').val('');
      sharedObject.updateName();
      assert(sharedObject.name, 'not changed');
    });

    it('updateName should change the name property', function () {
      sharedObject.name = 'not changed';
      $('#name').val('changed');
      sharedObject.updateName();
      assert.equal(sharedObject.name, 'changed');
    });
  });

  describe('updateIncome', function () {
    it('updateIncome should not change the income property if the textbox property is negative', function () {
      sharedObject.income = 20;
      $('#income').val('-10');
      sharedObject.updateIncome();
      assert(sharedObject.income, 20);
    });

    it('updateIncome should not change the income property if the textbox property is zero', function () {
      sharedObject.income = 20;
      $('#income').val('0');
      sharedObject.updateIncome();
      assert.equal(sharedObject.income, 20);
    });

    it('updateIncome should not change the income property if the textbox property is a floating-point number', function () {
      sharedObject.income = 20;
      $('#income').val('3.14');
      sharedObject.updateIncome();
      assert.equal(sharedObject.income, 20);
    });

    it('updateIncome should not change the income property if the textbox property is not a number', function () {
      sharedObject.income = 20;
      $('#income').val('text');
      sharedObject.updateIncome();
      assert(sharedObject.income, 20);
    });

    it('updateIncome should not change the income property if the textbox property is an empty string', function () {
      sharedObject.income = 20;
      $('#income').val('');
      sharedObject.updateIncome();
      assert(sharedObject.income, 20);
    });

    it('updateIncome should change the income property with valid input', function () {
      sharedObject.income = 20;
      $('#income').val('10');
      sharedObject.updateIncome();
      assert.equal(sharedObject.income, 10);
    });
  });
});
