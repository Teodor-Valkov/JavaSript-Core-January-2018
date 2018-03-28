function notify (message) {
  let paragraph = document.createElement('p');
  paragraph.textContent = message;

  let div = document.getElementById('notification');
  div.style.display = 'block';
  div.appendChild(paragraph);

  setTimeout(remove, 2000);

  function remove () {
    div.style.display = 'none';
    div.removeChild(paragraph);
  }
}
