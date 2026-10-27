const form = document.querySelector('#multi-form');
const steps = Array.from(document.querySelectorAll('.step'));
const back = document.querySelector('#back');
const next = document.querySelector('#next');
const message = document.querySelector('#message');
let current = 0;
let submitted = false;
function render(moveFocus = true) {
  steps.forEach(function (step, index) {
    step.hidden = index !== current;
    // Vetëm kontrollet e hapit aktiv marrin pjesë në validim.
    step.querySelectorAll('input, select').forEach(function (input) { input.disabled = index !== current; });
  });
  document.querySelectorAll('.steps li').forEach(function (item, index) {
    if (index === current) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  back.hidden = current === 0;
  next.textContent = current === 2 ? 'Konfirmo demonstrimin' : 'Vazhdo →';
  message.textContent = '';
  if (current === 2) {
    const schedule = document.querySelector('[name="schedule"]:checked');
    const values = [
      ['Emri', document.querySelector('#full-name').value.trim()],
      ['Emaili', document.querySelector('#email').value],
      ['Tema', document.querySelector('#topic').value],
      ['Orari', schedule ? schedule.value : '']
    ];
    const review = document.querySelector('#review');
    review.replaceChildren();
    values.forEach(function ([label, value]) {
      const term = document.createElement('dt');
      const details = document.createElement('dd');
      term.textContent = label;
      details.textContent = value;
      review.append(term, details);
    });
  }
  if (moveFocus) steps[current].querySelector('h2').focus();
}
form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (submitted) return;
  const name = document.querySelector('#full-name');
  name.setCustomValidity(name.value.trim() ? '' : 'Shkruaj emrin dhe mbiemrin.');
  const invalid = Array.from(steps[current].querySelectorAll('input, select')).find(function (input) { return !input.checkValidity(); });
  if (invalid) { invalid.reportValidity(); return; }
  if (current < 2) { current += 1; render(); }
  else {
    submitted = true;
    back.hidden = true;
    next.hidden = true;
    message.textContent = 'U konfirmua demonstrimi. Asnjë e dhënë nuk u dërgua.';
    document.querySelector('#restart').hidden = false;
    document.querySelector('#restart').focus();
  }
});
back.addEventListener('click', function () { if (current > 0 && !submitted) { current -= 1; render(); } });
document.querySelector('#restart').addEventListener('click', function () {
  form.reset();
  current = 0;
  submitted = false;
  next.hidden = false;
  this.hidden = true;
  render();
});
render(false);
