window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // available for each browser
// Интерфейс SpeechRecognitionEvent API Web Speech представляет объект события для событий result и nomatch и содержит все данные, связанные с промежуточным или конечным результатом распознавания речи.
const recognition = new SpeechRecognition(); //The SpeechRecognition() constructor creates a new SpeechRecognition object instance. - Конструктор SpeechRecognition() создает новый экземпляр объекта SpeechRecognition.

recognition.interimResults = true; // Свойство interimResults интерфейса SpeechRecognition определяет, следует ли возвращать промежуточные результаты (true) или нет (false.)

let p = document.createElement('p');

const words = document.querySelector('.words');

words.appendChild(p); // добавляем в наш блок родительского элемента ребенка - новый параграф

recognition.addEventListener('result', (e) =>{ // как только мы перестаем говорить, микрофон перестает нас слушать
    
    const transcript = [...e.results] // делаем массив из нашего результата говорения
        .map(result => result[0]) // берем только первый элемент из массива - в котором лежат все нужные свойства
        .map(result => result.transcript) // обращаемся к нему и вытаскиваем фразу или слово, которую только что сказали - выносим в массиве
        .join(' ') // объединяем наши слова из массива в одну длинную строку
    console.log(transcript);
    console.log(e.results[0].isFinal); // будет выдавать false, пока мы не перестанем говорить
    p.textContent = transcript; // засовываем в параграф слова, которые мы получили из функции выше - слова, которые мы говорим
    if(e.results[0].isFinal){ // Свойство isFinal только для чтения интерфейса SpeechRecognitionResult - это логическое значение, которое указывает, является ли этот результат окончательным (true) или нет (false) — если это так, то это последний раз, когда этот результат будет возвращен; если нет, то этот результат является промежуточным результатом и может быть обновлен позже
        // когда мы перестаем говорить на несколько секунд - создается новый параграф, который будет записывать в себя новую информацию
        p = document.createElement('p');
        words.appendChild(p);
    }
    if(transcript.includes("today is a sunny weather")){
        alert('Today the temprature is 26+')
    }
    
})

recognition.addEventListener('end', recognition.start); // как только заканчиваем говорить, функция прослушивания голоса заканчивается и запускается снова сразу


recognition.start(); // Метод start() API Web Speech запускает службу распознавания речи, прослушивающую входящий звук с намерением распознать грамматики, связанные с текущим распознаванием речи.