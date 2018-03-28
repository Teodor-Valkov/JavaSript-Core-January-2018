function solve () {
  let object = {
    extend: function (template) {
      let templateProperties = Object.keys(template);

      for (let property of templateProperties) {
        if (typeof (template[property]) === 'function') {
          let parent = Object.getPrototypeOf(object);
          parent[property] = template[property];
        } else {
          object[property] = template[property];
        }
      }
    }
  };

  return object;
}

let template = {
  templateMethod: function () {
    console.log('Extension Method');
  },
  templateProperty: 'someString'
};

let myObject = solve();
myObject.extend(template);

console.log(myObject);
console.log(Object.getPrototypeOf(myObject));
