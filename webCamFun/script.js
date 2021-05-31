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
        // take the pixels out
        let pixels = ctx.getImageData(0,0, width, height); // метод Canvas 2D API, возвращает объект ImageData, представляющий базовые пиксельные данные для области холста, обозначенного прямоугольником, который начинается в точке (sx, sy) и имеет ширину sw и высоту sh.
        // выдает большой массив данных, в котором дается подробная информация о каждом пикселе нашей картинки из контекста
        // mess with pixels
        // pixels = redEffect(pixels);
        // pixels = rggSplit(pixels);
        // ctx.globalAlpha = 0.8;
        pixels = greenScreen(pixels)
        // put them back
        ctx.putImageData(pixels, 0, 0)  // CanvasRenderingContext2D.putImageData() метод Canvas 2D API рисует данные из заданного ImageData объекта на холст. На этот метод не влияет матрица преобразования холста.
        // помещаем наши измененные пиксели на всю страницу отображения видео -  в контекст
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

function redEffect(pixels){ // увеличиваем насыщенность цветов, получая красный эффект
    // loop every pixel we have
    for(let i =0; i < pixels.data.length; i = i + 4){ // обращаемся к data - чтобы изменить цвет, благодаря getImageData
        pixels.data[i] = pixels.data[i] + 75  // red
        pixels.data[i+1] = pixels.data[i+1] - 50 // green
        pixels.data[i+2] = pixels.data[i+2] * 0.5// blue
    }
    return pixels
}

function rggSplit(pixels){ // чтобы все цвета съезжали в разные стороны
    for(let i =0; i < pixels.data.length; i = i + 4){ // обращаемся к data - чтобы изменить цвет, благодаря getImageData
        pixels.data[i - 150] = pixels.data[i]  // red
        pixels.data[i + 500] = pixels.data[i+1]  // green
        pixels.data[i - 550] = pixels.data[i+2] // blue
    }
    return pixels
}

    function greenScreen(pixels) {
        const levels = {}; // hold our min and max green
      
        document.querySelectorAll('.rgb input').forEach((input) => {
          levels[input.name] = input.value; // получаем все наши ползунки и задаем каждому уровню текущее состояние, которое мы указываем на ползунке
        }); // обращаемся к каждому уровню по имени, которое взяли у каждого ползунка из верстки
      
        for (i = 0; i < pixels.data.length; i = i + 4) {
          red = pixels.data[i + 0];
          green = pixels.data[i + 1];
          blue = pixels.data[i + 2];
          alpha = pixels.data[i + 3];
      
          if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
          }
        }
      
        return pixels;
      }
      


getVideo();

video.addEventListener('canplay',paintToCanvas )// Событие canplay происходит, когда обозреватель может начать воспроизведение указанного аудио/видео (когда он достаточно буферизован, чтобы начать).
// когда видео готово к воспроизведению - мы помещаем его в нужную нам область