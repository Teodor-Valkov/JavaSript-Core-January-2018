function toggle (event) {
  let span = document.getElementsByTagName('span')[0];

  let display = document.getElementById('extra').style.display;

  if (display === 'none' || display === '') {
    document.getElementById('extra').style.display = 'block';
    span.textContent = 'Less';
  } else if (display === 'block') {
    document.getElementById('extra').style.display = 'none';
    span.textContent = 'More';
  }
}
