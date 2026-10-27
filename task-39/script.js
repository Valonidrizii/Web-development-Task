const products = [
  { id: 1, name: 'Fletore', price: 5, stock: 25 },
  { id: 2, name: 'Çantë', price: 29.9, stock: 8 },
  { id: 3, name: 'Laps', price: 2, stock: 40 },
  { id: 4, name: 'Shishe', price: 12.5, stock: 13 },
  { id: 5, name: 'Bllok', price: 5, stock: 19 },
  { id: 6, name: 'Kufje', price: 100, stock: 4 }
];
const field = document.querySelector('#sort-field');
const direction = document.querySelector('#sort-direction');
function render() {
  const factor = direction.value === 'asc' ? 1 : -1;
  const sorted = [...products].sort(function (a, b) {
    const comparison = field.value === 'price' ? a.price - b.price : a.name.localeCompare(b.name, 'sq');
    // ID përcakton rendin e qëndrueshëm kur vlerat janë të njëjta.
    return comparison === 0 ? a.id - b.id : comparison * factor;
  });
  const body = document.querySelector('#products');
  body.replaceChildren();
  sorted.forEach(function (product) {
    const row = document.createElement('tr');
    [product.id, product.name, `${product.price.toFixed(2)} €`, product.stock].forEach(function (value) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });
    body.append(row);
  });
  document.querySelector('#sort-status').textContent = `Renditja: ${field.value === 'name' ? 'emri' : 'çmimi'}, ${factor === 1 ? 'në rritje' : 'në zbritje'}.`;
  ['name', 'price'].forEach(function (key) {
    const header = document.querySelector(`#${key}-header`);
    if (field.value === key) header.setAttribute('aria-sort', factor === 1 ? 'ascending' : 'descending');
    else header.removeAttribute('aria-sort');
  });
}
field.addEventListener('change', render);
direction.addEventListener('change', render);
render();
