const clockSec = document.querySelector('.clock-sec');
const clockHour = document.querySelector('.clock-hour');
const clockMin = document.querySelector('.clock-min');

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const secondsDegrees = ((seconds / 60) * 360) + 90; // делим кол-во секунд на 60 и умножаем на 360 градусов, чтобы получить нужный градус стрелки
  const minutesDegrees = (360/60) * minutes + 90; // то же самое для минут, только стрелка меняет реже свое положение
  const hoursDegrees = (360/12)*hours + 90; // раз в час стрелка меняет свое положение на 30 градусов
  clockSec.style.transform = `rotate(${secondsDegrees}deg)`; // задаем стиль для секундной стрелки, на какое кол-во градусов ей нужно поворачиваться каждую секунду
  clockMin.style.transform = `rotate(${minutesDegrees}deg)`;
  clockHour.style.transform = `rotate(${hoursDegrees}deg)`;
  console.log(seconds, minutes, hours);
}

setInterval(setDate, 1000); // устанавливает интервал для секундной стрелки