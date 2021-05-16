    // Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1

    // Some data we can work with

    const inventors = [
        { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
        { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
        { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
        { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
        { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
        { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
        { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
        { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
        { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
        { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
        { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
        { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
      ];
  
      const people = [
        'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
        'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
        'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
        'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
        'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
      ];
      
      // Array.prototype.filter()
      // 1. Filter the list of inventors for those who were born in the 1500's
      // filter our array
      const peopleBornIn15 = inventors.filter(human =>  human.year > 1500 && human.year < 1599) // return the result of these samples
      console.table(peopleBornIn15);

      // Array.prototype.map()
      // 2. Give us an array of the inventors first and last names
      // map - return a new array
      const inventorsNames = inventors.map ((inventor) => {
          return inventor.first + ' ' + inventor.last
      } )
      console.table(inventorsNames);
  
      // Array.prototype.sort()
      // 3. Sort the inventors by birthdate, oldest to youngest
      // you have two items and you sort two items all the time from the big array
    //   inventors.sort((FirstBorn, LastBorn) => {
    //       return LastBorn.year - FirstBorn.year;
    //   })
    inventors.sort((First, Last) => First.year > Last.year ? 1 : -1)

      console.table(inventors)
  
      // Array.prototype.reduce()
      // 4. How many years did all the inventors live all together?

      const inventorsYears = inventors.map((inventor) => {
          return inventor.passed - inventor.year
      });
      const sumOfYears = inventorsYears.reduce((total, current) => total + current);
      console.log(sumOfYears);

      // альтернатива
    //   let sum = 0
    //   for (let i = 0; i < inventorsYears.length;i++ ) {
    //         sum = inventorsYears[i] + sum;
    //   }
    //   console.log(sum);

  
      // 5. Sort the inventors by years lived
      inventors.sort((FirstPerson, SecondPerson) => { // меньше нуля - влево, больше нуля - вправо
          return (FirstPerson.passed - FirstPerson.year) - (SecondPerson.passed - SecondPerson.year);
      })
      console.log(inventors);
  
      // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
      // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
      
    //   const category = document.querySelector('.mw-category'); // находим категорию на странице
    //   const links = [...category.querySelectorAll('a')]; // находим все ссылки в нашей категории - преобразуя сразу в список наш псевдомссив

    //   const de = links.map(link => link.textContent); // берем текст из каждой ссылки в категории
    //   de.filter(name => name.includes('de '))
      // 7. sort Exercise
      // Sort the people alphabetically by last name
      const alpha = people.sort((lastOne, nextOne) => {
        const [alast, afirst] = lastOne.split(', '); // делит строку на два разных элемента в списке
        const [blast, bfirst] = nextOne.split(', '); // делит строку на два разных элемента в списке
        return alast > blast ? 1 : -1; // сравниваем первую часть каждого списка(фамилию) - возвращаем элементы в нужном алфавитном порядке
      })
     console.log(alpha);
     

      // 8. Reduce Exercise
      // Sum up the instances of each of these
      const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
  
      const trans = data.reduce((object, item) => {
        if (!object[item]) {
            object[item] = 0; // задаем всем ключам автоматически значение 0 в объекте, тем самым формируем этот ключ в нашем текущем объекте
        }
        object[item]++; // если попадает элемент с ключем, который уже был, увеличиваем его на один
        return object
      }, {}) //  объект в самом начале у нас уже будет сформирован  - куда мы будем записывать все элементы
      console.log(trans);