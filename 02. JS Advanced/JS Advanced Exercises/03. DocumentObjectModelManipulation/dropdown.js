function addItem () {
  let text = document.getElementById('newItemText');
  let value = document.getElementById('newItemValue');

  let option = document.createElement('option');
  option.textContent = text.value;
  option.value = value.value;
  // option.setAttribute('value', value.value);

  let select = document.getElementById('menu');
  select.appendChild(option);

  text.value = '';
  value.value = '';
}
