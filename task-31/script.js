const input = document.querySelector('#guess');
const feedback = document.querySelector('#feedback');
const button = document.querySelector('#guess-button');
let secret;
let attempts;
let ended;

function newGame() {
  secret = Math.floor(Math.random() * 20) + 1;
  attempts = 0;
  ended = false;
  input.disabled = false;
  button.disabled = false;
  input.value = '';
  document.querySelector('#attempts').textContent = '0 / 5';
  feedback.textContent = 'Loja filloi. Bëj provën e parë!';
}
document.querySelector('#guess-form').addEventListener('submit', function (event) {
  event.preventDefault();
  if (ended) return;
  const guess = input.valueAsNumber;
  if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
    feedback.textContent = 'Gabim: shkruaj një numër të plotë nga 1 deri në 20.';
    return;
  }
  attempts += 1;
  document.querySelector('#attempts').textContent = `${attempts} / 5`;
  if (guess === secret) {
    feedback.textContent = `Saktë! Numri ishte ${secret}. E gjete me ${attempts} përpjekje.`;
    ended = true;
  } else if (attempts === 5) {
    feedback.textContent = `Përpjekjet mbaruan. Numri ishte ${secret}. Fillo një lojë të re.`;
    ended = true;
  } else {
    feedback.textContent = guess < secret ? 'Provo një numër më të madh.' : 'Provo një numër më të vogël.';
  }
  input.disabled = ended;
  button.disabled = ended;
  if (ended) document.querySelector('#new-game').focus();
  else input.select();
});
document.querySelector('#new-game').addEventListener('click', function () {
  newGame();
  input.focus();
});
newGame();
