document.querySelector('#newsletter').addEventListener('submit', function (event) {
  event.preventDefault();
  const feedback = document.querySelector('#feedback');
  feedback.className = 'success';
  feedback.textContent = 'Sukses: formulari është i vlefshëm. Nuk u krye abonim real.';
});
