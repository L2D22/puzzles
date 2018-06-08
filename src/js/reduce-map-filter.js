// Reduce
const euros = [29.76, 41.85, 46.5];
const average = euros.reduce((total, amount, index, array) => {
  total += amount;
  if( index === array.length-1) {
    return total/array.length;
  }else {
    return total;
  }
});
console.log('average', average);// 39.37

// The thing is, you don’t always have to return a single value.
// You can reduce an array into a new array.
// initial value
// If we want to reduce an array of values into another array
// where every value is doubled, we need to push the amount * 2
// The benefit of using reduce comes into play when you want to
// map and filter together and you have a lot of data to go over.
const doubled = euros.reduce((total, amount) => {
    // filtering as well
    if (amount > 30) {
        total.push(amount);
    }
    return total;
// mapping to new array
}, []);

console.log('doubled', doubled); // [59.52, 83.7, 93]

const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
const count = fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = (tally[fruit] || 0) + 1 ;
  return tally;
} , {})
console.log('count', count); // { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }

const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// this doesn't work for deeper levels [[1, [2,3], 3], 4]
const flat = data.reduce((total, amount) => {
  return total.concat(amount);
}, []);
console.log('flat', flat);// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// Just get all the color data
const dataComplex = [
  {a: 'happy', b: 'robin', c: ['blue','green']},
  {a: 'tired', b: 'panther', c: ['green','black','orange','blue']},
  {a: 'sad', b: 'goldfish', c: ['green','red']}
];
const colors = dataComplex.reduce((total, amount) => {
  amount.c.forEach( color => {
      total.push(color);
  })
  return total;
}, []);
console.log('colors', colors); // ['blue','green','green','black','orange','blue','green','red']

const uniqueColors = dataComplex.reduce((total, amount) => {
  amount.c.forEach( color => {
    if (total.indexOf(color) === -1){
     total.push(color);
    }
  });
  return total;
}, []);

console.log('uniqueColors', uniqueColors); // [ 'blue', 'red', 'green', 'black', 'orange']
// !! Not entering an initial value is an easy mistake
// to make and one of the first things you should check when debugging.
// Another common mistake is to forget to return the total.

var stuff = [1,4,6,2,10];
stuff.forEach((item, i) => {
    console.log('i', i);
    console.log('item', item);
});

let highFive = stuff.filter((item, i) => {
    return item > 5;
});
console.log('highFive', highFive);

let twice = stuff.map((item, i) => {
    return item * 2;
});

console.log('twice', twice);

// Just get all the color data
const dataDump = [
    {a: 'happy', b: 'dragon', c: ['blue','green']},
    {a: 'tired', b: 'panther', c: ['green','black','orange','blue']},
    {a: 'sad', b: 'goldfish', c: ['green','red']},
    {a: 'sad', b: 'goldfish', c: ['green','red']}
];
const animals = dataDump.reduce((arr, item) => {
    console.log('arr', arr);
    console.log('item', item);
    // item.b.forEach( animal => {
    //     arr.push(animal);
    // })
    if(arr.indexOf(item.b) === -1) {
        arr.push(item.b);
    }

    return arr;
}, []);
console.log('animals', animals);

const fruity = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
const uniqueFruity = fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = (tally[fruit] || 0) + 1;
  return tally;
} , {})
console.log('uniqueFruity', uniqueFruity);

for (var prop in uniqueFruity) {
    console.log('prop', prop); // access key
    if (uniqueFruity.hasOwnProperty(prop)) {
        console.log('uniqueFruity[prop]', uniqueFruity[prop]); // access value
    }
}
