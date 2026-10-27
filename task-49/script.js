const input = document.querySelector('#json-input');
const output = document.querySelector('#output');
const message = document.querySelector('#message');
function processJson(minify) {
  output.textContent = '';
  if (!input.value.trim()) {
    message.textContent = 'Fusha është bosh. Ngjit JSON për të filluar.';
    input.setAttribute('aria-invalid', 'true');
    return;
  }
  try {
    const value = JSON.parse(input.value);
    output.textContent = JSON.stringify(value, null, minify ? 0 : 2);
    message.textContent = minify ? 'JSON i vlefshëm: u ngjesh.' : 'JSON i vlefshëm: u formatua me dy hapësira.';
    input.removeAttribute('aria-invalid');
  } catch (error) {
    message.textContent = `Gabim në JSON: ${error.message}`;
    input.setAttribute('aria-invalid', 'true');
  }
}
document.querySelector('#json-form').addEventListener('submit', function (event) { event.preventDefault(); processJson(false); });
document.querySelector('#minify').addEventListener('click', function () { processJson(true); });
