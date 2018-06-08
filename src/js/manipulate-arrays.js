export function manipulateArr() {
    var meals = ['breakfast', 'lunch', 'dinner'];

    // console.log('meals.splice(0,meals.length)', meals.splice(0,meals.length));
    // console.log('meals.length = 0', meals.length = 0);

    var copy = meals.slice();
    console.log('copy', copy);

    console.log('meals.length', meals.length);
    console.log('last item', meals[meals.length - 1]);
    console.log('last item', meals.slice(-1)[0]);

    console.log('remove first item', meals.shift());
    console.log('remove last item', meals.pop());

    console.log('add items to the beginning', meals.unshift('breakfast'));
    console.log('meals', meals);
    console.log('add items to the end', meals.push('dinner'));
    console.log('meals', meals);

    console.log('overwrite specific index', meals[0] = 'brunch');
    console.log('overwrite specific index', meals.splice(1, 1, 'brunch'));
    console.log('meals', meals);

    var eats = ['breakfast', 'lunch', 'dinner'];
    eats.splice(1,0, 'brunch', 'tea time');
    console.log('Add new item(s) at a specific index', eats);
    console.log('Remove single item at a specific index', eats.splice(1,1));
    console.log('Remove several items', eats.splice(1, 2));

    console.log('Reverse array', eats.reverse());

    console.log('Delimit array', eats.join(' AND '));

    meals = ['dinner', 'supper', 'breakfast', 'lunch'];
    console.log('Sort alphabetical', meals.sort() );

    var numbers = [1438,2605,794,3947,6241,11745,2585];
    numbers.sort(function(a, b) {
        return a - b;
    });
    console.log('sort numerical', numbers);

    var dayTimeMeals = ['breakfast', 'lunch'];
    var nightTimeMeals = ['merienda', 'dinner'];

    var allTheMeals = dayTimeMeals.concat(nightTimeMeals);

    // splice changes the orignal array
    // Argument 1: Index, Required. An integer that specifies at what position to add /remove items, Use negative values to specify the position from the end of the array.
    // Argument 2: Optional. The number of items to be removed. If set to 0(zero), no items will be removed. And if not passed, all item(s) from provided index will be removed.
    // Argument 3…n: Optional. The new item(s) to be added to the array.
    var array=[1,2,3,4,5];
    console.log(array.splice(2));
    // shows [3, 4, 5], returned removed item(s) as a new array object.

    console.log(array);
    // shows [1, 2], original array altered.

    var array2=[6,7,8,9,0];
    console.log(array2.splice(2,1));
    // shows [8]

    console.log(array2.splice(2,0));
    //shows [] , as no item(s) removed.

    console.log(array2);
    // shows [6,7,9,0]

    var array3=[11,12,13,14,15];
    console.log(array3.splice(2,1,"Hello","World"));
    // shows [13]

    console.log(array3);
    // shows [11, 12, "Hello", "World", 14, 15]

    // slice() returns new array
    // Argument 1: Required. An integer that specifies where to start the selection (The first element has an index of 0). Use negative numbers to select from the end of an array.
    // Argument 2: Optional. An integer that specifies where to end the selection. If omitted, all elements from the start position and to the end of the array will be selected. Use negative numbers to select from the end of an array.

    var array=[1,2,3,4,5]
    console.log(array.slice(2));
    // shows [3, 4, 5], returned selected element(s).

    console.log(array.slice(-2));
    // shows [4, 5], returned selected element(s).
    console.log(array);
    // shows [1, 2, 3, 4, 5], original array remains intact.

    var array2=[6,7,8,9,0];
    console.log(array2.slice(2,4));
    // shows [8, 9]

    console.log(array2.slice(-2,4));
    // shows [9]

    console.log(array2.slice(-3,-1));
    // shows [8, 9]

    console.log(array2);
    // shows [6, 7, 8, 9, 0]

    // SET
    var mySet = new Set();
    mySet.add(1);
    mySet.add(5);
    mySet.add('some text')

    mySet.size; // 3
}

console.log('result ',manipulateArr());
