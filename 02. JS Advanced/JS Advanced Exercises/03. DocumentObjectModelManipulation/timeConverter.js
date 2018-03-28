function attachEventsListeners () {
  let daysBtn = document.getElementById('daysBtn');
  daysBtn.addEventListener('click', convertFromDays);

  let hoursBtn = document.getElementById('hoursBtn');
  hoursBtn.addEventListener('click', convertFromHours);

  let minutesBtn = document.getElementById('minutesBtn');
  minutesBtn.addEventListener('click', convertFromMinutes);

  let secondsBtn = document.getElementById('secondsBtn');
  secondsBtn.addEventListener('click', convertFromSeconds);

  let days = document.getElementById('days');
  let hours = document.getElementById('hours');
  let minutes = document.getElementById('minutes');
  let seconds = document.getElementById('seconds');
  
  function convertFromDays () {
    convertTime(Number(days.value) * 86400);
  }

  function convertFromHours () {
    convertTime(Number(hours.value) * 3600);
  }

  function convertFromMinutes () {
    convertTime(Number(minutes.value) * 60);
  }

  function convertFromSeconds () {
    convertTime(Number(seconds.value));
  }

  function convertTime (time) {
    days.value = time / 86400;
    hours.value = time / 3600;
    minutes.value = time / 60;
    seconds.value = time;
  }
}
