const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value'); // элемент, который отображает нашу скорость

navigator.geolocation.watchPosition((data) => {
    console.log(data) // получим объект с координатами геолокации
    speed.textContent = data.coords.speed; // скорость постоянно будет обновляться - так как геолокация обновляется постоянно
    arrow.style.transform = `rotate(${data.coords.heading}deg)`; // на сколько градусов отклоняется к серверу
}, (err) => {
    console.log(err);
    alert('Hey! you got a problem')
}); // Метод геолокации watchPosition() используется для регистрации функции обработчика, которая будет вызываться автоматически при каждом изменении положения устройства. Вы также можете, при необходимости, указать функцию обратного вызова обработки ошибок.
// постоянно следит за положением
 // необходимо безопасное соединение



