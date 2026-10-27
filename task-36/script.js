const slides = [
  { file: 'mountain', caption: 'Male në agim', alt: 'Male të kaltër në agim, me diell mbi maja' },
  { file: 'lake', caption: 'Liqen i qetë', alt: 'Shtresa kodrash të gjelbra dhe ujë i qetë nën diell' },
  { file: 'sunset', caption: 'Perëndim në kodra', alt: 'Kodra në ngjyrë rozë dhe portokalli në perëndim' },
  { file: 'forest', caption: 'Shteg në pyll', alt: 'Peizazh i ilustruar me kodra të gjelbra dhe qiell të çelët' }
];
let index = 0;
const thumbnails = document.querySelector('#thumbnails');
slides.forEach(function (slide, i) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Shfaq imazhin ${i + 1}: ${slide.caption}`);
  const image = document.createElement('img');
  image.src = `images/${slide.file}.svg`;
  image.alt = '';
  button.append(image);
  button.addEventListener('click', function () { index = i; render(); });
  thumbnails.append(button);
});
function render() {
  const slide = slides[index];
  const image = document.querySelector('#slide-image');
  image.src = `images/${slide.file}.svg`;
  image.alt = slide.alt;
  document.querySelector('#caption').textContent = slide.caption;
  document.querySelector('#position').textContent = `Imazhi ${index + 1} nga ${slides.length}`;
  Array.from(thumbnails.children).forEach(function (button, i) {
    button.setAttribute('aria-pressed', String(i === index));
  });
}
document.querySelector('#previous').addEventListener('click', function () { index = (index - 1 + slides.length) % slides.length; render(); });
document.querySelector('#next').addEventListener('click', function () { index = (index + 1) % slides.length; render(); });
render();
