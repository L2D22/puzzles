// You have an array of numbers.
// Your task is to sort ascending odd numbers but even numbers must be on their places.
// sortArray([5, 3, 2, 8, 1, 4]) == [1, 3, 2, 8, 5, 4]
function sortOddArray(array) {
    if(array.length <= 0 || array == null) return array;
    let sortedOdd = [];
    let oddArr = array.filter((num) => num%2 ).sort((a,b)=> a > b);

    sortedOdd = array.map((num,i) => {
        // Odd returns 1 which is true
        if(num%2) {
            return oddArr.shift();
        }
        return num;
    });

    return sortedOdd;
}

console.log('sortOddArray()', sortOddArray([5, 3, 2, 8, 1, 4]));
console.log('sortOddArray()', sortOddArray([]));

function sortArray(array) {
  if(array.length == 0) {
    return array;
  }

  for(var i=0;i<array.length-1;i++) {
    for(var j = i; j < array.length; j++) {
      if((array[i] != 0) && (array[i] % 2 != 0) &&
        (array[j] != 0) && (array[j] % 2 != 0)) {
        console.log('ij', i, j);
        console.log('array[i], array[j]', array[i], array[j]);
          if(array[i] > array[j]) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
        }
    }
  }

  return array;
}

console.log('sortArray()', sortArray([5, 3, 2, 8, 1, 4]));
