function nuke(selector1, selector2) {
  if (selector1 === selector2) {
    return;
  }

  let test = $(selector1).filter(selector2).remove();
}

let assert = require('chai').assert;
let jsdom = require('jsdom-global')();
let $ = require('jquery');

describe('nuke', function () {
  beforeEach(function () {
    document.body.innerHTML =
      `<div id="target">
                <div class="nested target">
                    <p>This is some text</p>
                </div>
                <div class="target">
                    <p>Empty div</p>
                </div>
                <div class="inside">
                    <span class="nested">Some more text</span>
                    <span class="target">Some <span>more</span> text</span>
                </div>
            </div>`;
  });

  it('should do nothing with invalid selector1', function () {
    let initialHtml = $('body').html();
    nuke('invalid', '#target');
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should do nothing with invalid selector2', function () {
    let initialHtml = $('body').html();
    nuke('#target', 'invalid');
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should do nothing with empty selector1', function () {
    let initialHtml = $('body').html();
    nuke('', '#target');
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should do nothing with empty selector2', function () {
    let initialHtml = $('body').html();
    nuke('#target', '');
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should do nothing with empty selectos', function () {
    let initialHtml = $('body').html();
    nuke('', '');
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should do nothing with empty', function () {
    let initialHtml = $('body').html();
    nuke();
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should do nothing with only one selector2', function () {
    let initialHtml = $('body').html();
    nuke('#target');
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should do noting with equal selectors', function () {
    let initialHtml = $('body').html();
    nuke('#target', '#target');
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should do nothing with valid selectors which do not interact', function () {
    let initialHtml = $('body').html();
    nuke('.nested', 'p');
    let afterHtml = $('body').html();

    assert.equal(initialHtml, afterHtml);
  });

  it('should remove div with class "inside"', function () {
    let initialHtml = $('#target').html();
    nuke('.inside', 'div');
    let afterHtml = $('#target').html();

    assert.equal($('div .inside').length, 0);
    assert.notEqual(initialHtml, afterHtml);
  });

  it('should remove span with class "nested"', function () {
    let initialHtml = $('#target').html();
    nuke('.nested', 'span');
    let afterHtml = $('#target').html();

    assert.equal($('span .nested').length, 0);
    assert.notEqual(initialHtml, afterHtml);
  });

  it('should remove two divs with class "target"', function () {
    let initialHtml = $('#target').html();
    let initialDivsCount = $('div').length;
    nuke('div', '.target');
    let afterHtml = $('#target').html();
    let afterDivsCount = $('div').length;

    assert.equal(initialDivsCount - afterDivsCount, 2);
    assert.equal($('div.target').length, 0);
    assert.notEqual(initialHtml, afterHtml);
  });
});
