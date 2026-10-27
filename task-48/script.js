const input = document.querySelector('#image-input');
const image = document.querySelector('#preview-image');
const preview = document.querySelector('#preview');
const message = document.querySelector('#message');
let objectUrl = null;
function removePreview() {
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = null;
  image.onload = null;
  image.onerror = null;
  image.removeAttribute('src');
  preview.hidden = true;
  document.querySelector('#file-info').textContent = '';
}
input.addEventListener('change', function () {
  removePreview();
  const file = input.files[0];
  if (!file) { message.textContent = 'Nuk është zgjedhur imazh.'; return; }
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    message.textContent = 'Gabim: pranohen vetëm imazhe JPEG ose PNG.';
    input.value = '';
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    message.textContent = 'Gabim: imazhi duhet të jetë deri në 2 MB.';
    input.value = '';
    return;
  }
  objectUrl = URL.createObjectURL(file);
  const currentUrl = objectUrl;
  image.onload = function () {
    if (objectUrl !== currentUrl) return;
    preview.hidden = false;
    message.textContent = 'Parapamja është gati. Asgjë nuk u ngarkua në server.';
  };
  image.onerror = function () {
    if (objectUrl !== currentUrl) return;
    removePreview();
    input.value = '';
    message.textContent = 'Gabim: skedari nuk mund të lexohet si imazh.';
  };
  image.alt = `Parapamje: ${file.name}`;
  document.querySelector('#file-info').textContent = `${file.name} · ${(file.size / 1024).toFixed(1)} KB · ${file.size} bajte`;
  message.textContent = 'Duke përgatitur parapamjen…';
  image.src = currentUrl;
});
document.querySelector('#clear').addEventListener('click', function () {
  removePreview();
  input.value = '';
  message.textContent = 'Parapamja u pastrua.';
  input.focus();
});
window.addEventListener('pagehide', removePreview);
