

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('keydown', (e) => {
        // console.log(e.keyCode); // каждый раз при клике будет выдавать ключ нажатой клавиши
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); // выдаст нам элемент, на который мы нажали
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // будет брать элемент, который мы нажмем на клавиатуре, который существует в верствке, иначе null
        if (!audio) return; // stop function from running all together - ничего не будет выдавать
        audio.currentTime = 0; // rewind to the start
        audio.play();
        key.classList.add('playing'); // добавляем класс элементу, на который нажали
        // setTimeout(() => {
        //     key.classList.remove('playing')
        // }, 500)
    })

    const buttons = document.querySelectorAll('.key');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('key')) {
                e.target.classList.add('playing')
            }
        })
    })


    function removeTransition(e) {
        if(e.propertyName !== 'transform') return ; // skip it if it is not a trasform
        
        this.classList.remove('playing'); // обращаемся к элементу, который нажали и убираем у него класс, как только закончится трансформация
    }

    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend',removeTransition))

  });