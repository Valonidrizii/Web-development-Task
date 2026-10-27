const questions = [
  { text: 'Cili element është titulli kryesor?', options: ['<h1>', '<p>', '<span>'], correct: 0 },
  { text: 'Cila veti CSS ndryshon ngjyrën e tekstit?', options: ['display', 'color', 'margin'], correct: 1 },
  { text: 'Cila metodë e kthen JSON në objekt JavaScript?', options: ['JSON.stringify()', 'JSON.parse()', 'Array.join()'], correct: 1 },
  { text: 'Cili atribut lidh label me input?', options: ['src', 'href', 'for'], correct: 2 },
  { text: 'Cila metodë shton një element në fund të një array?', options: ['push()', 'pop()', 'slice()'], correct: 0 }
];
const answers = [];
let current = 0;
let finished = false;
const form = document.querySelector('#quiz-form');
const message = document.querySelector('#message');
function renderQuestion() {
  const question = questions[current];
  document.querySelector('#position').textContent = `Pyetja ${current + 1} nga ${questions.length}`;
  document.querySelector('#question').textContent = question.text;
  const options = document.querySelector('#options');
  options.replaceChildren();
  question.options.forEach(function (text, index) {
    const label = document.createElement('label');
    label.className = 'choice';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = index;
    input.required = true;
    label.append(input, document.createTextNode(text));
    options.append(label);
  });
  document.querySelector('#next').textContent = current === questions.length - 1 ? 'Shfaq rezultatin' : 'Vazhdo →';
}
function showResults() {
  finished = true;
  form.hidden = true;
  document.querySelector('#results').hidden = false;
  const score = questions.reduce((sum, question, index) => sum + Number(answers[index] === question.correct), 0);
  document.querySelector('#score').textContent = `Pikët e tua: ${score} / ${questions.length}`;
  const review = document.querySelector('#review');
  review.replaceChildren();
  questions.forEach(function (question, index) {
    if (answers[index] === question.correct) return;
    const item = document.createElement('li');
    item.textContent = `${question.text} Përgjigjja jote: ${question.options[answers[index]]}. E sakta: ${question.options[question.correct]}.`;
    review.append(item);
  });
  if (!review.children.length) {
    const item = document.createElement('li');
    item.textContent = 'Të gjitha përgjigjet ishin të sakta!';
    review.append(item);
  }
  document.querySelector('#position').textContent = 'Kuizi përfundoi';
  document.querySelector('#results').focus();
}
form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (finished) return;
  const selected = document.querySelector('[name="answer"]:checked');
  if (!selected) { message.textContent = 'Zgjidh një përgjigje për të vazhduar.'; return; }
  answers[current] = Number(selected.value);
  if (current === questions.length - 1) showResults();
  else {
    current += 1;
    renderQuestion();
    document.querySelector('[name="answer"]').focus();
  }
});
document.querySelector('#restart').addEventListener('click', function () {
  current = 0;
  finished = false;
  answers.length = 0;
  message.textContent = '';
  form.hidden = false;
  document.querySelector('#results').hidden = true;
  document.querySelector('#review').replaceChildren();
  document.querySelector('#score').textContent = '';
  renderQuestion();
  document.querySelector('[name="answer"]').focus();
});
renderQuestion();
