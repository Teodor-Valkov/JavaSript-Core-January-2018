function subtract () {
  let firstNumber = Number(document.getElementById('firstNumber').value);
  let secondNumber = Number(document.getElementById('secondNumber').value);

  let div = document.getElementById('result');
  div.textContent = firstNumber - secondNumber;
}
