function mapSort (map, sortFunc) {
  if (!sortFunc) {
    sortFunc = function (a, b) {
      return a[0].toString().localeCompare(b[0].toString());
    };
  }

  let sortedMap = new Map();

  Array.from(map.entries()).sort(sortFunc).forEach(pair => sortedMap.set(pair[0], map.get(pair[0])));

  return sortedMap;
}

// function mapSort (map, sortFunc) {
//   if (sortFunc === undefined) {
//     sortFunc = function (a, b) {
//       return a[0].toString().localeCompare(b[0].toString());
//     };
//   }
//
//   let sortedMap = new Map();
//
//   for (let [key, value] of Array.from(map).sort(sortFunc)) {
//     sortedMap.set(key, value);
//   }
//
//   return sortedMap;
// }

module.exports = mapSort;
