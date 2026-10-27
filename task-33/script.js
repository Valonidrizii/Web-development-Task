document.querySelector('#text').addEventListener('input', function (event) {
  const text = event.target.value;
  const trimmed = text.trim();
  document.querySelector('#words').textContent = trimmed ? trimmed.split(/\s+/u).length : 0;
  document.querySelector('#characters').textContent = Array.from(text.replace(/\s/gu, '')).length;
  const sentences = text.match(/[^.!?\s][^.!?]*[.!?]+/gu) || [];
  document.querySelector('#sentences').textContent = sentences.length;
});
