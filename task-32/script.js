document.querySelectorAll('.toggle').forEach(function (button) {
  button.addEventListener('click', function () {
    const input = document.getElementById(button.getAttribute('aria-controls'));
    const visible = input.type === 'password';
    input.type = visible ? 'text' : 'password';
    button.textContent = visible ? 'Fshih fjalëkalimin' : 'Shfaq fjalëkalimin';
    button.setAttribute('aria-pressed', String(visible));
  });
});
document.querySelector('#password-form').addEventListener('submit', function (event) {
  event.preventDefault();
  document.querySelector('#message').textContent = document.querySelector('#password').value === document.querySelector('#confirmation').value
    ? 'Fjalëkalimet përputhen. Ky është vetëm demonstrim.'
    : 'Gabim: fjalëkalimet nuk përputhen.';
});
