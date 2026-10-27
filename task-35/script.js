const input = document.querySelector('#seconds');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const status = document.querySelector('#status');
let remaining = 60000;
let deadline = 0;
let interval = null;
let paused = false;

function duration() {
  const value = input.valueAsNumber;
  return Number.isInteger(value) && value > 0 && value <= 604800 ? value * 1000 : null;
}
function render() {
  const seconds = Math.max(0, Math.ceil(remaining / 1000));
  document.querySelector('#display').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
function tick() {
  remaining = Math.max(0, deadline - performance.now());
  render();
  if (remaining === 0) {
    clearInterval(interval);
    interval = null;
    paused = false;
    input.disabled = false;
    start.disabled = false;
    pause.disabled = true;
    status.textContent = 'Koha përfundoi!';
  }
}
document.querySelector('#timer-form').addEventListener('submit', function (event) {
  event.preventDefault();
  if (interval !== null) return;
  if (!paused) {
    remaining = duration();
    if (remaining === null) {
      remaining = 0;
      render();
      status.textContent = 'Gabim: vendos numër të plotë nga 1 deri në 604800.';
      return;
    }
  }
  deadline = performance.now() + remaining;
  interval = setInterval(tick, 100);
  input.disabled = true;
  start.disabled = true;
  pause.disabled = false;
  paused = false;
  status.textContent = 'Numërimi po vazhdon.';
  tick();
});
pause.addEventListener('click', function () {
  if (interval === null) return;
  tick();
  if (interval === null) return;
  clearInterval(interval);
  interval = null;
  paused = true;
  start.disabled = false;
  pause.disabled = true;
  status.textContent = 'Në pauzë. Nis vazhdon nga koha e mbetur.';
});
document.querySelector('#reset').addEventListener('click', function () {
  clearInterval(interval);
  interval = null;
  paused = false;
  input.disabled = false;
  start.disabled = false;
  pause.disabled = true;
  const value = duration();
  remaining = value === null ? 0 : value;
  render();
  status.textContent = value === null ? 'Gabim: vendos numër të plotë nga 1 deri në 604800.' : 'Koha u rivendos sipas kohëzgjatjes së vendosur.';
});
input.addEventListener('input', function () {
  if (interval === null && !paused) {
    const value = duration();
    remaining = value === null ? 0 : value;
    render();
  }
});
