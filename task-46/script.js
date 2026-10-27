const items = ['Fletore', 'Laps', 'Laptop', 'Kufje', 'Maus', 'Tastierë', 'Monitor', 'Shishe uji'];
const all = document.querySelector('#select-all');
const list = document.querySelector('#items');
items.forEach(function (name, index) {
  const label = document.createElement('label');
  label.className = 'choice';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.value = name;
  input.id = `item-${index}`;
  input.addEventListener('change', update);
  label.append(input, document.createTextNode(name));
  list.append(label);
});
function selected() { return Array.from(list.querySelectorAll('input:checked')); }
function update() {
  const count = selected().length;
  all.checked = count === items.length;
  all.indeterminate = count > 0 && count < items.length;
  document.querySelector('#count').textContent = `Të zgjedhura: ${count} nga ${items.length}`;
  document.querySelector('#selected-names').textContent = '';
}
all.addEventListener('change', function () {
  list.querySelectorAll('input').forEach(input => { input.checked = all.checked; });
  update();
});
document.querySelector('#clear').addEventListener('click', function () {
  list.querySelectorAll('input').forEach(input => { input.checked = false; });
  update();
});
document.querySelector('#show').addEventListener('click', function () {
  const names = selected().map(input => input.value);
  document.querySelector('#selected-names').textContent = names.length ? `Përzgjedhja: ${names.join(', ')}.` : 'Nuk ke zgjedhur asnjë artikull.';
});
update();
