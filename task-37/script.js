const messages = {
  success: 'Sukses: veprimi demonstrues përfundoi.',
  warning: 'Paralajmërim: kontrollo të dhënat para se të vazhdosh.',
  error: 'Gabim: veprimi demonstrues nuk u krye. Provo përsëri.'
};
let sequence = 0;
document.querySelectorAll('[data-notice]').forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    const type = trigger.dataset.notice;
    sequence += 1;
    const notice = document.createElement('div');
    notice.className = `notice ${type}`;
    const text = document.createElement('p');
    text.textContent = `${messages[type]} (#${sequence})`;
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'secondary';
    close.textContent = 'Mbyll';
    close.setAttribute('aria-label', `Mbyll njoftimin ${sequence}`);
    let timeout;
    function dismiss() {
      clearTimeout(timeout);
      // Kur largohet një buton i fokusuar, kthe fokusin te shkaktari.
      if (notice.contains(document.activeElement)) trigger.focus();
      notice.remove();
    }
    close.addEventListener('click', dismiss);
    notice.append(text, close);
    document.querySelector('#notifications').append(notice);
    document.querySelector('#announcement').textContent = text.textContent;
    if (type === 'success') timeout = setTimeout(dismiss, 5000);
  });
});
