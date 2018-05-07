function attachEvents() {
  $('#buttonLoadTowns').click(displayTowns);

  let townSource = $('#towns-template').html();
  let townTemplate = Handlebars.compile(townSource);
  let container = $('#root');

  function displayTowns() {
    container.empty();

    let townNames = $('#towns').val().split(/\s*,\s*/g);

    for (let townName of townNames) {
      let town = townTemplate({
        townName
      });

      container.append(town);
    }
  }
}