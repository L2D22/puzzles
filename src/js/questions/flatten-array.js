// Q: Take an array of arrays and flatten into one array of only numbers
const array = [[3], [1], 2, [3, [7, [6]]]];

function flatten(arr) {}
console.log("result", flatten(array)); // [3, 1, 2, 3, 7, 6];

// doesn't twerrrrk
// Question: Take an array of arrays and flatten into one array of only numbers
// const array = [[3], [1], 2, [3, [7, [6]]]];
//
// function flatten(array) {
//   var result = [];
//
//
//   if (!Array.isArray(array)) {
//
//   } else {
//     console.log(result);
//     for (var i = 0; i < array.length; i++) {
//       result = result.concat(array[i]);
//     }
//
//     result = result.concat(flatten(array));
//   }
//   return result;
// }
//
// // Answer: [3, 1, 2, 3, 7, 6];
// console.log('result', flatten(array));
// A:
function flatten(arr) {
  let flatten = [];

  reduceArrays(arr);
  // this type of data manipulation especially for large data sets
  // crashes the browser
  function reduceArrays(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        reduceArrays(arr[i]);
      } else {
        flatten.push(arr[i]);
      }
    }
  }

  return flatten;
}

const array = [[3], [1], 2, [3, [7, [6]]]];

flatten(array); // [3, 1, 2, 3, 7, 6];
