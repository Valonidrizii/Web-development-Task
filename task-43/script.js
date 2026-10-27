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

const key = 'intern-task-43-bookmarks';
function normalizedUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url.href;
  } catch { return null; }
}
let bookmarks = loadItems(key, item => item && typeof item.id === 'string' && typeof item.title === 'string' && item.title.trim() && typeof item.url === 'string' && normalizedUrl(item.url) === item.url);
const title = document.querySelector('#title');
const url = document.querySelector('#url');
const message = document.querySelector('#message');
function render() {
  const list = document.querySelector('#bookmarks');
  list.replaceChildren();
  document.querySelector('#empty').hidden = bookmarks.length > 0;
  bookmarks.forEach(function (bookmark) {
    const row = document.createElement('li');
    const link = document.createElement('a');
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const address = document.createElement('p');
    address.className = 'muted';
    address.textContent = bookmark.url;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'danger';
    remove.textContent = 'Fshi';
    remove.setAttribute('aria-label', `Fshi lidhjen ${bookmark.title}`);
    remove.addEventListener('click', function () {
      bookmarks = bookmarks.filter(item => item.id !== bookmark.id);
      saveItems(key, bookmarks);
      render();
      message.textContent = 'Lidhja u fshi.';
      title.focus();
    });
    row.append(link, address, remove);
    list.append(row);
  });
}
document.querySelector('#bookmark-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const normalized = normalizedUrl(url.value.trim());
  if (!title.value.trim()) { message.textContent = 'Gabim: shkruaj titullin.'; title.focus(); return; }
  if (!normalized) { message.textContent = 'Gabim: përdor një adresë të vlefshme me http:// ose https://.'; url.focus(); return; }
  if (bookmarks.some(item => item.url === normalized)) { message.textContent = 'Gabim: kjo adresë është ruajtur më parë.'; return; }
  if (!this.reportValidity()) return;
  bookmarks.push({ id: newId(), title: title.value.trim(), url: normalized });
  saveItems(key, bookmarks);
  render();
  this.reset();
  message.textContent = 'Lidhja u shtua. Hapet në një skedë të re.';
  title.focus();
});
render();
