function attachEventsListeners () {
  let button = document.getElementById('convert');
  button.addEventListener('click', convertDistance);

  let units = {
    km: 1000,
    m: 1,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    yrd: 0.9144,
    ft: 0.3048,
    in: 0.0254
  };

  function convertDistance () {
    let inputDistance = document.getElementById('inputDistance');

    let inputDistanceUnits = document.getElementById('inputUnits');
    let outputDistanceUnits = document.getElementById('outputUnits');

    let meters = Number(inputDistance.value) * units[inputDistanceUnits.value];
    let convertedMeters = meters / units[outputDistanceUnits.value];

    let outputDistance = document.getElementById('outputDistance');
    outputDistance.value = convertedMeters;
  }
}
