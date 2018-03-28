class Numberbox {
  constructor (label, selector, minValue, maxValue) {
    this._label = label;
    this.selector = selector;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.value = this.minValue;

    let that = this;
    $(selector).on('input change', function () {
      that.value = $(this).val();
    });
  }

  get label () {
    return this._label;
  }

  get elements () {
    return $(this.selector);
  }

  get value () {
    return this._value;
  }
  set value (value) {
    if (Number(value) < this.minValue || Number(value) > this.maxValue || Number(value) % 1 !== 0) {
      throw new Error('Number too small or too big');
    }

    this._value = Number(value);
    this.elements.val(value);
  }
}

module.exports = Numberbox;
