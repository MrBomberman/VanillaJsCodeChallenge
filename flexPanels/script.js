const panels = document.querySelectorAll('.panel');

function toggleOpen(){
  this.classList.toggle('open'); // наш элемент, в который кликнули получит этот класс или при повторном клике его уберет
}

function toggleActive(e){
  if(e.propertyName.includes('flex')){ // проверяем наличие изменения flex, если его нет, класс будет исчезать автоматически
    this.classList.toggle('open-active');
  }
}

panels.forEach(panel => {
  panel.addEventListener('click', toggleOpen)
})
panels.forEach(panel => {
  panel.addEventListener('transitionend', toggleActive) // начнет свое выполнение, когда произойдет изменение transition
})