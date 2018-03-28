function getDollarFormatter (formatter) {
  return function (value) {
    return formatter(',', '$', true, value);
  };
}

function currencyFormatter (separator, symbol, symbolFirst, value) {
  let result = Math.trunc(value) + separator;
  result += value.toFixed(2).substr(-2, 2);

  if (symbolFirst) {
    return symbol + ' ' + result;
  }

  return result + ' ' + symbol;
}

let dollarFormatter = getDollarFormatter(currencyFormatter);

console.log(dollarFormatter(5345));
console.log(dollarFormatter(3.1429));
console.log(dollarFormatter(2.709));
