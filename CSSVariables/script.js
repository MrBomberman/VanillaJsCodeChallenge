const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || ''; // dataset is an object which contains all data attributes from element
  document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix); // напрямую изменяем свойство css переменной при помощи функции setProperty, обращаясь к текущему элементу, над которым происходит изменение
  // this.name - имя нашего элемента, котрое становится переменной css , которую надо изменить, this.value - состояние, на которое мы меняем свойтсво элемента
}

inputs.forEach(input => input.addEventListener('change', handleUpdate)); // следит за изменением состояния элемента
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate)); // следит за состоянием движения мыши, когда она на элементе - также вызывая функцию, которая меняет свойство элемента