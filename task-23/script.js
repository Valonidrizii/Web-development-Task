document.querySelector('#delivery-form').addEventListener('submit', function (event) {
  event.preventDefault();
  document.querySelector('#message').textContent = 'Formulari u plotësua. Demonstrim: nuk u krye dërgesë.';
});
