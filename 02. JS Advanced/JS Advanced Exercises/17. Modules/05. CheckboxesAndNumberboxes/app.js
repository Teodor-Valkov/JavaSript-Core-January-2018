let Checkbox = require('./checkbox');
// result.Checkbox = Checkbox;

let Numberbox = require('./numberbox');
// result.Numberbox = Numberbox;

let check = new Checkbox('Is Married:', '#married');
let number = new Numberbox('Age:', '#age', 1, 100);
let checkbox = $('#married');
let numberbox = $('#age');
checkbox.on('change', () => console.log(check.value));
numberbox.on('change', () => console.log(number.value));
