let data = require('./data');
result.data = data;

function sort (property) {
  return result.data.sort((a, b) => a[property].localeCompare(b[property]));
}

function filter (property, value) {
  return result.data.filter(object => object[property] === value);
}

result.sort = sort;
result.filter = filter;
