const storageStatus = document.querySelector('#storage-status');
function loadItems(key, validate) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(value) || !value.every(validate) || new Set(value.map(item => item.id)).size !== value.length) throw new Error('Invalid data');
    return value;
  } catch {
    storageStatus.textContent = 'Të dhënat lokale nuk mund të lexohen. Mund të fillosh një listë të re.';
    return [];
  }
}
function saveItems(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    storageStatus.textContent = '';
  } catch {
    storageStatus.textContent = 'Ruajtja lokale nuk është e disponueshme. Ndryshimet do të humbasin pas rifreskimit.';
  }
}
function newId() { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }

const key = 'intern-task-42-notes';
const title = document.querySelector('#title');
const body = document.querySelector('#body');
const message = document.querySelector('#message');
let notes = loadItems(key, item => item && typeof item.id === 'string' && typeof item.title === 'string' && item.title.trim() && typeof item.body === 'string');
let editingId = null;
function clearEditor() {
  editingId = null;
  document.querySelector('#note-form').reset();
  document.querySelector('#save').textContent = 'Shto shënimin';
  document.querySelector('#cancel').hidden = true;
}
function render() {
  const list = document.querySelector('#notes');
  list.replaceChildren();
  document.querySelector('#empty').hidden = notes.length > 0;
  notes.forEach(function (note) {
    const row = document.createElement('li');
    const heading = document.createElement('h3');
    const text = document.createElement('p');
    heading.textContent = note.title;
    text.textContent = note.body;
    text.className = 'note-body';
    const actions = document.createElement('div');
    actions.className = 'actions';
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'secondary';
    edit.textContent = 'Ndrysho';
    edit.setAttribute('aria-label', `Ndrysho shënimin ${note.title}`);
    edit.addEventListener('click', function () {
      editingId = note.id;
      title.value = note.title;
      body.value = note.body;
      document.querySelector('#save').textContent = 'Ruaj ndryshimet';
      document.querySelector('#cancel').hidden = false;
      message.textContent = 'Duke ndryshuar shënimin e zgjedhur.';
      title.focus();
    });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'danger';
    remove.textContent = 'Fshi';
    remove.setAttribute('aria-label', `Fshi shënimin ${note.title}`);
    remove.addEventListener('click', function () {
      if (!window.confirm(`Ta fshij shënimin “${note.title}”?`)) return;
      notes = notes.filter(item => item.id !== note.id);
      if (editingId === note.id) clearEditor();
      saveItems(key, notes);
      render();
      message.textContent = 'Shënimi u fshi.';
      title.focus();
    });
    actions.append(edit, remove);
    row.append(heading, text, actions);
    list.append(row);
  });
}
document.querySelector('#note-form').addEventListener('submit', function (event) {
  event.preventDefault();
  if (!title.value.trim()) { message.textContent = 'Gabim: titulli nuk mund të jetë bosh.'; title.focus(); return; }
  if (!this.reportValidity()) return;
  if (editingId !== null) {
    const note = notes.find(item => item.id === editingId);
    if (note) { note.title = title.value.trim(); note.body = body.value; }
  } else notes.push({ id: newId(), title: title.value.trim(), body: body.value });
  saveItems(key, notes);
  clearEditor();
  render();
  message.textContent = 'Shënimi u ruajt.';
  title.focus();
});
document.querySelector('#cancel').addEventListener('click', function () { clearEditor(); message.textContent = 'Ndryshimet u anuluan.'; title.focus(); });
render();
