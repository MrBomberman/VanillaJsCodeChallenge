const video = document.querySelector('.player'); // наше видео
const canvas = document.querySelector('.photo'); // область, на которую мы будем выводить наше видео
const ctx = canvas.getContext('2d'); // контекст фотографии
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap'); // звук щелчка

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false}) // вернет промис -  запрашивает разрешение на использование камеры компьютера
        .then(localMediaStream => {
            console.log(localMediaStream); // получаем наше видео
            video.srcObject = localMediaStream;  // засовываем наше видео в нужный нам элемент
            video.play(); // делаем так, чтобы видео проигрывалось сразу
        })
        .catch( err => {
            console.error('Oh no! ', err)
        })
}

function paintToCanvas() {
    const width = video.videoWidth; // получаем ширину нашего видео
    const height = video.videoHeight;
    canvas.width = width; // задаем параметры нашей области, на которую будем выводить видео, чтобы качество вижео не менялось
    canvas.height = height;
    console.log(width, height)

    return setInterval(() => {
        ctx.drawImage(video, 0 , 0, width, height) // помещае наше видео в контекст нужной области, задавая координаты начала и ширину и высоту картинки - тем самым переносим нужный нам масштаб в область побольше
    }, 20) // выполняется каждый 20 миллисекунд
}

function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas - взять картинку из нужной нам области
    const data = canvas.toDataURL('image/jpeg'); // метод, который возвращает data URI изображения в формате, заданном параметром type (по умолчанию PNG)
    
    // console.log(data)
    const link = document.createElement('a'); // срздаем элемент - ссылку на нашу фотографию
    link.href = data; // помещаем в элемент ссылку на наше фото - его информацию
    link.setAttribute('download', 'handsome'); // Добавляет новый атрибут или изменяет значение существующего атрибута у выбранного элемента.
    link.innerHTML = `<img src="${data} alt="picture"/>`
    strip.insertBefore(link, strip.firstChild); // вставляем ссылку на нашу фотографию в панель загрузки

}

getVideo();

video.addEventListener('canplay',paintToCanvas )// Событие canplay происходит, когда обозреватель может начать воспроизведение указанного аудио/видео (когда он достаточно буферизован, чтобы начать).
// когда видео готово к воспроизведению - мы помещаем его в нужную нам область