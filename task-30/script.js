const input = document.querySelector('#temperature');
const direction = document.querySelector('#direction');
const result = document.querySelector('#result');

function convert() {
  const value = input.valueAsNumber;
  if (input.value.trim() === '' || !Number.isFinite(value)) {
    result.textContent = 'Gabim: vendos një temperaturë të vlefshme.';
    result.className = 'result error';
    input.setAttribute('aria-invalid', 'true');
    return;
  }
  const toFahrenheit = direction.value === 'c-f';
  const converted = toFahrenheit ? value * 9 / 5 + 32 : (value - 32) * 5 / 9;
  if (!Number.isFinite(converted)) {
    result.textContent = 'Gabim: numri është shumë i madh për t’u konvertuar.';
    result.className = 'result error';
    return;
  }
  input.removeAttribute('aria-invalid');
  result.className = 'result';
  result.textContent = `${value} °${toFahrenheit ? 'C' : 'F'} = ${Number(converted.toFixed(2))} °${toFahrenheit ? 'F' : 'C'}`;
}
document.querySelector('#converter').addEventListener('submit', function (event) {
  event.preventDefault();
  convert();
});
input.addEventListener('input', convert);
direction.addEventListener('change', convert);
