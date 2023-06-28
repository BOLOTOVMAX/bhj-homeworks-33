const items = document.querySelector('#items');
const loader = document.querySelector('#loader');

fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
  .then(response => response.json())
  .then(data => {
    const valutes = data.response.Valute;

    for (const key in valutes) {
      const valute = valutes[key];
      const item = document.createElement('div');
      item.classList.add('item');

      const code = document.createElement('div');
      code.classList.add('item__code');
      code.textContent = valute.CharCode;

      const value = document.createElement('div');
      value.classList.add('item__value');
      value.textContent = valute.Value;

      const currency = document.createElement('div');
      currency.classList.add('item__currency');
      currency.textContent = 'руб.';

      item.appendChild(code);
      item.appendChild(value);
      item.appendChild(currency);

      items.appendChild(item);
    }

    loader.classList.remove('loader_active');
  })
  .catch(error => {
    console.error(error);
    loader.style.display = 'none';
    items.innerHTML = 'Ошибка загрузки данных';
  });