    // start with strings, numbers and booleans
    let age = 100;
    let age2 = 100
    console.log(age, age2);
    // if you change the original one it is not going to update the other variable
    // Let's say we have an array
    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];


    // and we want to make a copy of it.
    const team = players; // it is just reference to the original array, not another array
    console.log(team)

    // You might think we can just do something like this:


    // however what happens when we update that array?

    // now here is the problem!

    // oh no - we have edited the original array too!

    // Why? It's because that is an array reference, not an array copy. They both point to the same array!

    // So, how do we fix this? We take a copy instead!
    const team2 = players.slice(); // make a copy of an array


    // one way

    // or create a new array and concat the old one in

    const team3 = [].concat(players);
    console.log(team3)
    // or use the new ES6 Spread

    const team4 = [...players];

    // now when we update it, the original one isn't changed

    // The same thing goes for objects, let's say we have a person object

    // with Objects
    const person = {
      name: 'Wes Bos',
      age: 80
    };
    // то же самое происходит с объектами - необходимо использовать специальные команды
    // and think we make a copy:
    
    // how do we take a copy instead?
   const cap =  Object.assign({}, person, {number : 99})

    // We will hopefully soon see the object ...spread
    const cap3 = {...person}
    console.log(cap3)

    // Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

    const cap4 = {
        name: 'Lol',
        age: 123,
        fuck: {
            omg: 'What is going on..'
        }
    }
    console.log(cap4)

    const dev = Object.assign({}, cap4);
    console.log(dev);