const slides = document.querySelectorAll('.slide-in');

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}



function checkSlide(e) {
    slides.forEach(slide => {
        const slideInAt = (window.scrollY + window.innerHeight) - slide.height / 2; // в итоге из этого выражения получаем число пикселей, на котором должна начать появляться каждая картинка в зависимости от ее размера и момента скролла, до которого мы дошли - середина картинки - нужная позиция
        const imageBottom = slide.offsetTop + slide.height; // получаем верхнюю позицию картинки по отношению к самому верху страницы и прибавляем к ней весь размер картинки, тем самым находим нижний край картинки
        console.log(imageBottom);
        const isHalfShown = slideInAt > slide.offsetTop; // проверяем дошли ли мы до момента, когда надо показывать картинку - до ее середины- если вернхняя позиция картинки относительно начала страницы меньше, чем часть, которая показана - картинка появится
        console.log(isHalfShown);
        const isNotScrolledPast = window.scrollY < imageBottom; // дает результат, прокрутили ли мы картинку или нет - если картинка полностью прокручена - она должна снова исчезнуть - если мы прокрутили больше  и прошли нижнюю позицию картинки - то она снова исчезнет
        if (isHalfShown && isNotScrolledPast) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    })
}

window.addEventListener('scroll', debounce(checkSlide));


// slides.forEach(slide => {
//   slide.addEventListener('click', () => {
//     if(slide.classList.contains('active')){
// slide.classList.remove('active')
//     } else {
//       slide.classList.add('active');
//     }


//   })
// })