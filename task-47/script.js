const data = {
  mk: ['Shkup', 'Tetovë', 'Ohër'],
  al: ['Tiranë', 'Durrës', 'Shkodër'],
  xk: ['Prishtinë', 'Prizren', 'Pejë']
};
const country = document.querySelector('#country');
const city = document.querySelector('#city');
const summary = document.querySelector('#summary');
country.addEventListener('change', function () {
  city.replaceChildren();
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = country.value ? 'Zgjidh qytetin' : 'Zgjidh fillimisht shtetin';
  city.append(placeholder);
  city.disabled = !country.value;
  (data[country.value] || []).forEach(function (name) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    city.append(option);
  });
  summary.textContent = country.value ? 'Tani zgjidh një qytet.' : 'Zgjidh shtetin për të parë qytetet.';
});
city.addEventListener('change', function () {
  summary.textContent = city.value ? `Ke zgjedhur: ${city.value}, ${country.selectedOptions[0].textContent}.` : 'Tani zgjidh një qytet.';
});
