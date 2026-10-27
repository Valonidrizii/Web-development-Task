const expenses = [];
const filter = document.querySelector('#filter');
const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const message = document.querySelector('#message');
let nextId = 1;
function render() {
  const visible = expenses.filter(item => filter.value === 'all' || item.category === filter.value);
  const list = document.querySelector('#expenses');
  list.replaceChildren();
  visible.forEach(function (expense) {
    const row = document.createElement('li');
    const text = document.createElement('p');
    text.textContent = `${expense.description} · ${expense.category} · ${(expense.cents / 100).toFixed(2)} €`;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'danger';
    remove.textContent = 'Fshi';
    remove.setAttribute('aria-label', `Fshi shpenzimin ${expense.description}`);
    remove.addEventListener('click', function () {
      const index = expenses.findIndex(item => item.id === expense.id);
      expenses.splice(index, 1);
      render();
      message.textContent = 'Shpenzimi u fshi dhe totali u përditësua.';
      description.focus();
    });
    row.append(text, remove);
    list.append(row);
  });
  document.querySelector('#empty').hidden = visible.length > 0;
  const total = visible.reduce((sum, item) => sum + item.cents, 0);
  document.querySelector('#total').textContent = `${filter.value === 'all' ? 'Totali i të gjitha shpenzimeve' : 'Totali vetëm i shpenzimeve të dukshme (' + filter.value + ')'}: ${(total / 100).toFixed(2)} €`;
}
document.querySelector('#expense-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const value = amount.valueAsNumber;
  if (!description.value.trim()) { message.textContent = 'Gabim: shkruaj përshkrimin.'; description.focus(); return; }
  if (!Number.isFinite(value) || value <= 0 || !amount.checkValidity()) { message.textContent = 'Gabim: vendos shumë pozitive deri në 1000000 €, me jo më shumë se dy shifra dhjetore.'; amount.focus(); return; }
  // Shumat mbahen në cent për të shmangur gabimet e pikës lëvizëse.
  expenses.push({ id: nextId++, description: description.value.trim(), cents: Math.round(value * 100), category: document.querySelector('#category').value });
  this.reset();
  render();
  message.textContent = 'Shpenzimi u shtua.';
  description.focus();
});
filter.addEventListener('change', render);
render();
