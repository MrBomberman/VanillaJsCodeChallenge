const slider = document.querySelector('.items');

let isDown = false; // flag if we click or not
let startX; // where we have clicked
let scrollLeft; //// сколько мы пролистали влево

slider.addEventListener('mousedown',(e) => {
    isDown = true; // когда мы нажимаем на элемент
    slider.classList.add('active');
    console.log(e.pageX) // сколько пикселей от левого края при клике
    startX = e.pageX - slider.offsetLeft; // из кол-ва пикселей от левого края вычитываем отступ слайдера чтобы не было сбоя в масштабе
    scrollLeft = slider.scrollLeft; // сколько мы пролистали влево
    console.log(startX)
}) //Событие mousedown срабатывает, когда кнопка указывающего устройства (к примеру, мыши) нажата над элементом.


slider.addEventListener('mouseleave', () => {
    isDown = false; // когда мы покидаем зону слайдера
    slider.classList.remove('active');
}) // Событие mouseleave срабатывает, когда курсор манипулятора (обычно мыши) перемещается за границы элемента.
slider.addEventListener('mouseup', () => {
    isDown = false; // когда мы отпускаем кнопку мыши
    slider.classList.remove('active');
}) //Событие mouseup возникает на Element, когда кнопка на аппаратном манипуляторе курсора (на мыши или трекпаде) отпущена, в то время как указатель находится на элементе
slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; // stop function from running
    // будет срабатывать только на тру
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft; // из кол-ва пикселей от левого края вычитываем отступ слайдера чтобы не было сбоя в масштабе - пересчитываем каждый раз, как мы двигаем мышку
    console.log(x, startX) // текущее положение курсора и начальная точка нажатия
    const walk = x - startX; // как далеко мы зашли от нашей начальной точки - на которую нажали
    console.log(walk)
    console.log(slider.scrollLeft) // сколько пикселей пролистали влево у слайдера
    slider.scrollLeft = scrollLeft - walk; // вычитаем из кол-ва пикселе, которые пролистали влево - кол-во пикселей, которые прошли от начальной точки
}) //Событие mousemove запускается в элементе, когда указывающее устройство (обычно мышь) перемещается, когда точка доступа курсора находится внутри него