const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // будет брать наши элементы по ключу из localStorage и если там данных не будет - будем возвращать пустой массив

function addItem(e) {
    e.preventDefault(); // страница перестанет перегружаться
    const text = (this.querySelector('[name=item]')).value; // берем наш элемент, в который вводим текст - this - вся форма и в ней мы находим нужный элемент, и далее из этого элемента при помощи свойства value достаем введенный текст
    const item = {
        text: text,
        done: false
    } // создаем элемент, который будет пушить на страницу
    items.push(item); // помещаем наш элемент в массив
    populateList(items, itemsList); // помещаем наш текст в вертску
    localStorage.setItem('items', JSON.stringify(items)); // передаем по ключу items наши элементы items - при этом необходимо распарсить через json - чтобы было читабельно - передаем данные в localStorage
    this.reset(); // очищает форму от последнего набранного текста

}

function populateList(items = [], platesList) {
    platesList.innerHTML = items.map((item, i) => {
        return `
  <li>
    <input type='checkbox' data-index=${i} id='item${i}' ${item.done ? 'checked' : ''} />
    <label for='item${i}'>${item.text}</label>
  </li>
  `; // берем нужный нам список в верстке и помещаем в него все элементы - при помощи map переберем все элементы и вернем каждый элемент в виде строки верстки, поместив его на страницу -  также проверяем, нажали ли мы на чекбокс или нет
    }).join(''); // потому что map вернет массив, а нам его надо превратить в одну большую строку, чтобы поместить в верстку- поэтому используем join('')
} // создаем функцию при помощи которой будет пушить весь наш введеный текст в верстку

function toggleDone(e) {
    if (!e.target.matches('input')) { // проверяем, если не кликнули на нужный элемент
        return; // skip this unless an input
    }
    const el = e.target; // то, куда мы кликнули
    const index = el.dataset.index; // берем индекс элемента, на который кликнули
    items[index].done = !items[index].done; // каждый раз будем менять свойство элемента по индексу, когда будем кликать на него
    localStorage.setItem('items', JSON.stringify(items)); // привязываем наши изменения в localStorage
    populateList(items, itemsList); // вставляем элементы измененные в верстку
}

addItems.addEventListener('submit', addItem); // каждый раз будет срабатывать, когда мы будем отправлять данные

itemsList.addEventListener('click', toggleDone); // когда будет кликать по нашему текущему списку, будет выполнятся функция

populateList(items, itemsList); // вставляем наш массив из localStorage в верстку - соответсвенно все изменения сохраняются в localStorage

// сделать кнопку, которая будет выделять сразу все