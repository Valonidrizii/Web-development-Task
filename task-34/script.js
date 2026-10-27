const display = document.querySelector('#display');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const lap = document.querySelector('#lap');
const status = document.querySelector('#status');
let elapsed = 0;
let startedAt = 0;
let interval = null;
let laps = 0;

function currentTime() {
  return elapsed + (interval !== null ? performance.now() - startedAt : 0);
}
function formatTime(ms) {
  const tenths = Math.floor(ms / 100);
  return `${String(Math.floor(tenths / 600)).padStart(2, '0')}:${String(Math.floor(tenths / 10) % 60).padStart(2, '0')}.${tenths % 10}`;
}
function render() { display.textContent = formatTime(currentTime()); }
start.addEventListener('click', function () {
  if (interval !== null) return;
  startedAt = performance.now();
  interval = setInterval(render, 50);
  start.disabled = true;
  pause.disabled = false;
  lap.disabled = false;
  status.textContent = 'Kronometri po mat kohën.';
});
pause.addEventListener('click', function () {
  if (interval === null) return;
  elapsed = currentTime();
  clearInterval(interval);
  interval = null;
  render();
  start.disabled = false;
  pause.disabled = true;
  lap.disabled = true;
  status.textContent = 'Në pauzë. Nis vazhdon matjen.';
});
lap.addEventListener('click', function () {
  if (interval === null) return;
  if (laps === 0) document.querySelector('#laps').replaceChildren();
  laps += 1;
  const item = document.createElement('li');
  item.textContent = `Xhiro ${laps}: ${formatTime(currentTime())}`;
  document.querySelector('#laps').append(item);
  status.textContent = item.textContent;
});
document.querySelector('#reset').addEventListener('click', function () {
  clearInterval(interval);
  interval = null;
  elapsed = 0;
  laps = 0;
  render();
  document.querySelector('#laps').replaceChildren();
  const empty = document.createElement('li');
  empty.textContent = 'Ende pa xhiro.';
  document.querySelector('#laps').append(empty);
  start.disabled = false;
  pause.disabled = true;
  lap.disabled = true;
  status.textContent = 'Kronometri u rivendos.';
});
