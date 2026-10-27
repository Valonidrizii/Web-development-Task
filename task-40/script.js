const names = ['Arta', 'Besa', 'Drita', 'Elira', 'Fisnik', 'Gent', 'Hana', 'Ilir', 'Jona', 'Klea', 'Luan', 'Mira', 'Nora', 'Orin', 'Pranvera', 'Rina', 'Sokol', 'Teuta', 'Uran', 'Vesa', 'Yll', 'Zana', 'Arian'];
const records = names.map(function (name, index) { return { id: index + 1, name, course: ['HTML', 'CSS', 'JavaScript'][index % 3] }; });
let page = 1;
let pageSize = 5;
function render() {
  const totalPages = Math.ceil(records.length / pageSize);
  const first = (page - 1) * pageSize;
  const list = document.querySelector('#records');
  list.replaceChildren();
  list.start = first + 1;
  records.slice(first, first + pageSize).forEach(function (record) {
    const item = document.createElement('li');
    item.textContent = `${record.id}. ${record.name} — ${record.course}`;
    list.append(item);
  });
  document.querySelector('#page-indicator').textContent = `Faqja ${page} nga ${totalPages} · ${records.length} regjistrime`;
  document.querySelector('#previous').disabled = page === 1;
  document.querySelector('#next').disabled = page === totalPages;
}
document.querySelector('#previous').addEventListener('click', function () { if (page > 1) { page -= 1; render(); } });
document.querySelector('#next').addEventListener('click', function () { if (page < Math.ceil(records.length / pageSize)) { page += 1; render(); } });
document.querySelector('#page-size').addEventListener('change', function (event) {
  pageSize = Number(event.target.value);
  page = 1;
  render();
});
render();
