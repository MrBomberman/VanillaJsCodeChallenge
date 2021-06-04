const msg = new SpeechSynthesisUtterance();
// Конструктор SpeechSynthesisUtterance() интерфейса SpeechSynthesisUtterance возвращает новый экземпляр объекта SpeechSynthesisUtterance.
// будем создавать то что голос должен сказать

  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value; // будет брать наш текущий текст для произношения


function populateVoices(){ // привязываем все голоса, которые есть
  voices = this.getVoices(); // the getVoices() method of the SpeechSynthesis interface returns a list of SpeechSynthesisVoice objects representing all the available voices on the current device. - вернет разные виды голосов, которые находятся на нашем устройстве
  const voiceOptions = voices
    // .filter(voice => voice.lang.includes('en'))// отфильтрует только английский акцент
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`) 
    .join(''); 
  // будем наполнять наш селект всеми голосами, которые есть в браузере - возвращаем каждый голос, который обернут в тег для верстки
  // превращаем нам массив в одну большую строку и помещаем ее в вертску
  voicesDropdown.innerHTML = voiceOptions;
}

function setVoice(){
    msg.voice = voices.find(voice => voice.name === this.value); // будем находить голос, на который кликнули и делать его текущим
    // оборачиваем все голоса в массив и находим текущий голос - который будем произносить фразу
    toggle();
}

function toggle(startOver = true){ // когда мы меняем голос на новый - он останавливается и начинает говорить новым голосом
    speechSynthesis.cancel();
    if(startOver){ // если флаг в положении тру - голос будет обновлятся и говорить сразу
        speechSynthesis.speak(msg);
    }
    
}

function setOption(){
    console.log(this.name, this.value)
    msg[this.name] = this.value; // обращаемся по ключу - если у нашего сообщения будет менятся какое-то свойство - мы его будем перезаписывать
    toggle(); // запускаем функцию произношения после обновления свойств речи
}

speechSynthesis.addEventListener('voiceschanged', populateVoices) // Событие voiceschanged API Web Speech запускается при изменении списка объектов SpeechSynthesisVoice, которые будут возвращены методом SpeechSynthesis.getVoices () (при срабатывании события voiceschanged.)

voicesDropdown.addEventListener('change', setVoice);  // каждый раз, когда будем менять голос в селекте- будет вызываться эта функция

options.forEach(option => option.addEventListener('change', setOption)) // каждый раз, когда будет обновляться одна из наших опций - будет выполнятсья функция
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false))