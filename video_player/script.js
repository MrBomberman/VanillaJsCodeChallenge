// need to get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



// built function
// функция, чтобы включать видео или ставить его на паузу
function togglePlay() {
  if(video.paused){ // если стоит на паузе
    video.play()
    toggle.innerHTML = '| |';
  } else { // если играет видео
    video.pause();
    toggle.innerHTML = '►';
  }
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip); // находим текущее время воспроизведения видео и добавляем к нему атрибут кнопки на которую нажали для изменения отрезка воспроизведения - parseFloat чтобы вернуть число, а не строку
}

function handleRangeUpdate(){
  video[this.name] = this.value; // обращаемся к одному из свойств видео, когда меняем его состояние - присваивая указанную информацию, которую мы выбрали в ползунке

}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100; // вычисляем процент просмотренного в видео
  progressFilled.style.flexBasis = `${percent}%` // изменяет процент заполняемости ползунка в зависимости от кол-ва минут просмотренного видео
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // кол-во пикселей, на которые нажали делим на общую длинну ползунка и умножаем на общую длинну видео, тем самым находим текущее место остановки видео в процентах
  video.currentTime = scrubTime;
  console.log(e)
}

// hook up the event listeners
video.addEventListener('click', togglePlay);// при нажатии на окно видео будет запускаться
toggle.addEventListener('click', togglePlay); // при нажатии на кнопку видео запуститься
skipButtons.forEach(btn => {
  btn.addEventListener('click', skip)
})
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
})
video.addEventListener('timeupdate', handleProgress); // Событие timeupdate запускается, когда время, указанное атрибутом currentTime, было обновлено.
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true); // если мы нажимаем на элемент, то ползунок можно менять
progress.addEventListener('mouseup', () => mousedown = false); // если отпускаем ползунок, он перестает следить за мышью
progress.addEventListener('mousemove', () => { // если все условия соблюдаются и ползунок двигается - то видео изменяется и его ползунок
  if(mousedown){
    scrub()
  }
});