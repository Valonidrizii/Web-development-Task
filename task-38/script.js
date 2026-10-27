const progress = document.querySelector('#progress');
const back = document.querySelector('#back-top');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0;
  document.querySelector('#progress-fill').style.transform = `scaleX(${value / 100})`;
  progress.setAttribute('aria-valuenow', String(Math.round(value)));
  document.querySelector('#percentage').textContent = `${Math.round(value)}%`;
  back.hidden = window.scrollY < 300;
}
let scheduled = false;
function scheduleUpdate() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(function () { scheduled = false; updateProgress(); });
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
new ResizeObserver(scheduleUpdate).observe(document.body);
back.addEventListener('click', function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
  const heading = document.querySelector('h1');
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
});
updateProgress();
