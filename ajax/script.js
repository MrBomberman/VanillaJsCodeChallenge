const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []; // массив, куда придет ответ от сервера

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data)) // добавляем в наш массив весь полученный результат

function findMatches(wordToMatch, cities){ // на вход идет слово в поисковик и наш текущий массив со всеми городами
  return cities.filter(place => {
    // здесь указываем код, по которому будем определять совпадение города по тому, что ищем
    const regex = new RegExp(wordToMatch, 'gi'); // Конструктор RegExp создаёт объект регулярного выражения для сопоставления текста с шаблоном.
    return place.city.match(regex) || place.state.match(regex); // проверяем совпадает ли с городом или штатом слово, которое ввели
  })
}

function displayMatches(){
  const matchArr = findMatches(this.value, cities); // проверяем слово, которое вводим и получаем результаты из массива
  const html = matchArr.map(place => { // все совпадения из массива будут вставлятся в вертску - place - каждый одельный элемент
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`) // меняем текст каждого названия города, выделяя буквы, которые мы вводим на буквы выделенные цветом
        const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`)// тоже самое делаем и для названия каждого штата, заменяем буквы на цветные - имеено те, которые вводим
    return `
      <li>
        <span class='name'>${cityName}, ${stateName}</span>
        <span class='population'>${place.population}</span>
      </li>
    `
  }).join(''); // объединяет массив в одну большую строку
  suggestions.innerHTML = html;
}

const search = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions')

search.addEventListener('change', displayMatches);
search.addEventListener('keyup', displayMatches);