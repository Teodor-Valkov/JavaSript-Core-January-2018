function create (sections) {
  for (let section of sections) {
    let paragraph = document.createElement('p');
    paragraph.textContent = section;
    paragraph.style.display = 'none';

    let div = document.createElement('div');
    div.addEventListener('click', show);
    div.appendChild(paragraph);

    let content = document.getElementById('content');
    content.appendChild(div);
  }

  function show () {
    this.children[0].style.display = 'block';
  }
}
